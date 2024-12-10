package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

type TransferRequest struct {
	SenderAccount   string  `json:"sender_account"`
	ReceiverAccount string  `json:"receiver_account"`
	Amount          float64 `json:"amount"`
}

func handleTransfer(w http.ResponseWriter, r *http.Request) {
	var request TransferRequest

	err := json.NewDecoder(r.Body).Decode(&request)
	if err != nil {
		http.Error(w, "Invalid JSON", http.StatusBadRequest)
		return
	}

	// Validate transfer amount
	if request.Amount <= 0 {
		http.Error(w, "Amount must be greater than zero", http.StatusBadRequest)
		return
	}

	// Process the transfer and store it in the database
	transactionID, err := processTransfer(request) // Return transactionID
	if err != nil {
		http.Error(w, "Transfer failed", http.StatusInternalServerError)
		return
	}

	// Send a successful response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"status":           "success",
		"message":          "Transfer completed",
		"transaction_id":   transactionID,
		"sender_account":   request.SenderAccount,
		"receiver_account": request.ReceiverAccount,
		"amount":           request.Amount,
	})
}

// Process the transfer logic and interact with the database
func processTransfer(request TransferRequest) (int, error) {
	// Begin a transaction to ensure the integrity of the operation
	tx, err := db.Begin()
	if err != nil {
		return 0, fmt.Errorf("failed to begin transaction: %w", err)
	}
	defer tx.Rollback() // Ensure rollback if anything goes wrong

	// Get sender and receiver account balances
	var senderBalance, receiverBalance float64
	err = tx.QueryRow("SELECT balance FROM users WHERE account_number = $1", request.SenderAccount).
		Scan(&senderBalance)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, fmt.Errorf("sender account not found: %w", err)
		}
		return 0, fmt.Errorf("failed to get sender balance: %w", err)
	}

	err = tx.QueryRow("SELECT balance FROM users WHERE account_number = $1", request.ReceiverAccount).
		Scan(&receiverBalance)
	if err != nil {
		if err == sql.ErrNoRows {
			return 0, fmt.Errorf("receiver account not found: %w", err)
		}
		return 0, fmt.Errorf("failed to get receiver balance: %w", err)
	}

	// Ensure the sender has enough balance
	if senderBalance < request.Amount {
		return 0, fmt.Errorf("insufficient balance in sender's account")
	}

	// Deduct the amount from sender's balance and add it to the receiver's balance
	_, err = tx.Exec(
		"UPDATE users SET balance = balance - $1 WHERE account_number = $2",
		request.Amount,
		request.SenderAccount,
	)
	if err != nil {
		return 0, fmt.Errorf("failed to update sender balance: %w", err)
	}

	_, err = tx.Exec(
		"UPDATE users SET balance = balance + $1 WHERE account_number = $2",
		request.Amount,
		request.ReceiverAccount,
	)
	if err != nil {
		return 0, fmt.Errorf("failed to update receiver balance: %w", err)
	}

	// Insert the transaction into the transactions table
	var transactionID int
	err = tx.QueryRow(
		"INSERT INTO transactions (sender_account, receiver_account, amount) VALUES ($1, $2, $3) RETURNING transaction_id",
		request.SenderAccount,
		request.ReceiverAccount,
		request.Amount,
	).Scan(&transactionID)
	if err != nil {
		return 0, fmt.Errorf("failed to insert transaction: %w", err)
	}

	// Log the transfer in the transfer_logs table
	_, err = tx.Exec(
		"INSERT INTO transfer_logs (sender_account, receiver_account, amount, status) VALUES ($1, $2, $3, $4)",
		request.SenderAccount,
		request.ReceiverAccount,
		request.Amount,
		"completed",
	)
	if err != nil {
		return 0, fmt.Errorf("failed to log transfer: %w", err)
	}

	// Commit the transaction
	err = tx.Commit()
	if err != nil {
		return 0, fmt.Errorf("failed to commit transaction: %w", err)
	}

	// Return the transaction ID and a nil error
	fmt.Printf("Transfer completed: Transaction ID %d\n", transactionID)
	return transactionID, nil
}

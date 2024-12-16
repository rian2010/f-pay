package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
)

type User struct {
	Step     string `json:"step"`
	Username string `json:"username"`
	Password string `json:"password"`
	Pin      string `json:"pin"`
	NoHp     string `json:"no_hp"`
	Rekening string `json:"account_number"`
	Saldo    string `json:"balance"`
}

type UserResponse struct {
	Username string `json:"username"`
	NoHp     string `json:"no_hp"`
	Rekening string `json:"account_number"`
	Saldo    string `json:"balance"`
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	// Query the database to get all users
	rows, err := db.Query("SELECT username, no_hp, account_number, saldo FROM users")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Create a slice to store all users
	var users []UserResponse

	// Loop through the rows and scan the user data into the users slice
	for rows.Next() {
		var user UserResponse
		if err := rows.Scan(&user.Username, &user.NoHp, &user.Rekening, &user.Saldo); err != nil {
			http.Error(w, "Error scanning data", http.StatusInternalServerError)
			return
		}
		users = append(users, user)
	}

	// Check for any errors from iterating over rows
	if err := rows.Err(); err != nil {
		http.Error(w, "Error reading data", http.StatusInternalServerError)
		return
	}

	// Set the header for the response to be JSON
	w.Header().Set("Content-Type", "application/json")
	// Encode and send the users as a JSON response
	if err := json.NewEncoder(w).Encode(users); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

// GetUserHandler retrieves a user from the database (for development purposes only)
func GetUserHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	username := vars["username"]

	var user User
	err := db.QueryRow("SELECT username, password FROM users WHERE username = $1", username).
		Scan(&user.Username, &user.Password)

	if err == sql.ErrNoRows {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
		return
	}
}

// RegisterHandler handles user registration with password hashing
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	if len(user.Pin) != 6 || !isNumeric(user.Pin) {
		http.Error(w, "Pin must be 6 digits", http.StatusBadRequest)
		return
	}

	// Hash the password using the utils package (since it's in the same directory)
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	hashedPin, err := HasPin(user.Pin)
	if err != nil {
		http.Error(w, "Failed to hash pin", http.StatusInternalServerError)
		return
	}

	// Insert the user with the hashed password and no_hp into the database
	_, err = db.Exec(
		"INSERT INTO users (username, password, pin, no_hp) VALUES ($1, $2, $3, $4)",
		user.Username,
		hashedPassword,
		hashedPin,
		// user.Pin,
		user.NoHp,
	)
	if err != nil {
		http.Error(w, "Could not register user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User registered successfully"))
}

// LoginHandler handles user login with PIN and phone number verification
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var Request struct {
		Step string `json:"step"`  // "verify_no_hp" or "verify_pin"
		NoHP string `json:"no_hp"` // Phone number
		Pin  string `json:"pin"`   // PIN (only required for "verify_pin")
	}

	err := json.NewDecoder(r.Body).Decode(&Request)
	if err != nil {
		http.Error(w, "Invalid request format", http.StatusBadRequest)
		return
	}

	// Switch behavior based on the "step"
	switch Request.Step {
	case "verify_no_hp":
		handleVerifyPhoneNumber(w, Request.NoHP)
	case "verify_pin":
		handleVerifyPin(w, Request.NoHP, Request.Pin)
	default:
		http.Error(w, "Invalid step", http.StatusBadRequest)
	}
}

// Function to handle "verify_no_hp" step
func handleVerifyPhoneNumber(w http.ResponseWriter, noHP string) {
	var exists bool
	// Check if the phone number exists in the database
	err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE no_hp = $1)", noHP).Scan(&exists)
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	if !exists {
		http.Error(w, "Phone number not found", http.StatusNotFound)
		return
	}

	// Respond with success if the phone number exists
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Phone number verified"})
}

// Function to handle "verify_pin" step
func handleVerifyPin(w http.ResponseWriter, noHP, pin string) {
	var storedPin, username string
	// Retrieve the hashed PIN associated with the phone number
	err := db.QueryRow("SELECT pin FROM users WHERE no_hp = $1", noHP).Scan(&storedPin)
	if err == sql.ErrNoRows {
		http.Error(w, "Phone number or PIN not found", http.StatusUnauthorized)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Compare the provided PIN with the stored hashed PIN using bcrypt's CompareHashAndPassword
	if !CheckPin(storedPin, pin) {
		http.Error(w, "Invalid PIN", http.StatusUnauthorized)
		return
	}

	// Generate a token using the utils function
	token, err := GenerateToken(username)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Respond with the token
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{
		"token":   token,
		"message": "Login successful",
		"user": map[string]string{
			"username": username,
			"no_hp":    noHP,
		},
	})
}

// Utility function to check if the PIN is numeric
func isNumeric(str string) bool {
	for _, c := range str {
		if c < '0' || c > '9' {
			return false
		}
	}
	return true
}

// Get current logged-in user based on the JWT token
func GetCurrentUserHandler(w http.ResponseWriter, r *http.Request) {
	// Check if Authorization header is present
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Authorization header is required", http.StatusUnauthorized)
		return
	}

	// Split the header to extract the token
	tokenString := strings.Split(authHeader, " ")
	if len(tokenString) != 2 {
		http.Error(w, "Authorization header format is 'Bearer <token>'", http.StatusUnauthorized)
		return
	}

	// Parse and validate the token
	token, err := jwt.Parse(tokenString[1], func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte("jX8mT5xj7HXVTNpMQai8g6SnhmHKoAQvph4el54Y4u4="), nil
	})

	if err != nil || !token.Valid {
		http.Error(w, "Invalid or expired token", http.StatusUnauthorized)
		return
	}

	// Extract claims
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		http.Error(w, "Invalid token claims", http.StatusUnauthorized)
		return
	}

	// Get the username from the token claims
	username := claims["username"].(string)

	// Fetch user data from the database using the extracted username
	var user User
	err = db.QueryRow("SELECT username, no_hp, account_number, balance FROM users WHERE username = $1", username).
		Scan(&user.Username, &user.NoHp, &user.Rekening, &user.Saldo)

	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "User not found", http.StatusNotFound)
		} else {
			http.Error(w, "Database error", http.StatusInternalServerError)
		}
		return
	}

	// Return user data as JSON
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(user); err != nil {
		http.Error(w, "Error encoding JSON", http.StatusInternalServerError)
	}
}

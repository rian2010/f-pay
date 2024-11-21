package main

import (
	"database/sql"
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Pin      string `json:"pin"`
	NoHp     string `json:"no_hp"`
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	// Query the database to get all users
	rows, err := db.Query("SELECT username, password, pin, no_hp FROM users")
	if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	// Create a slice to store all users
	var users []User

	// Loop through the rows and scan the user data into the users slice
	for rows.Next() {
		var user User
		if err := rows.Scan(&user.Username, &user.Password, &user.Pin, &user.NoHp); err != nil {
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

	// Hash the password using the utils package (since it's in the same directory)
	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Failed to hash password", http.StatusInternalServerError)
		return
	}

	// Insert the user with the hashed password and no_hp into the database
	_, err = db.Exec(
		"INSERT INTO users (username, password, pin, no_hp) VALUES ($1, $2, $3, $4)", // Ensure to include the no_hp in the query
		user.Username,
		hashedPassword,
		user.NoHp, // Use the no_hp value from the request body
	)
	if err != nil {
		http.Error(w, "Could not register user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("User registered successfully"))
}

// LoginHandler handles user login with password verification
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid input", http.StatusBadRequest)
		return
	}

	var dbPassword string
	// Retrieve the hashed password from the database
	err = db.QueryRow("SELECT password FROM users WHERE username = $1", user.Username).
		Scan(&dbPassword)
	if err == sql.ErrNoRows {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	} else if err != nil {
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Check the password using the CheckPassword function from the same package
	if !CheckPassword(dbPassword, user.Password) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate a JWT token
	token, err := GenerateToken(user.Username)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	// Send the token in the response
	w.Header().Set("Authorization", "Bearer "+token)
	w.Write([]byte("Login successful"))
}

package main

import (
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

var db *sql.DB

func main() {
	var err error
	connStr := "user=twilight password=tambunan dbname=godb sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}

	// Check the database connection
	err = db.Ping()
	if err != nil {
		log.Fatal("Database connection error:", err)
	}

	router := mux.NewRouter()
	router.HandleFunc("/readAgain", GetUsers).Methods("GET")
	router.HandleFunc("/read", GetUserHandler).Methods("GET")
	router.HandleFunc("/register", RegisterHandler).Methods("POST")
	router.HandleFunc("/login", LoginHandler).Methods("POST")

	router.HandleFunc("/transfer", handleTransfer).Methods("POST")
	router.HandleFunc("/current_user", GetCurrentUserHandler).Methods("GET")
	// router.HandleFunc("/auth/verifyPin", VerifyPinHandler).Methods("POST")

	log.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", router))
}

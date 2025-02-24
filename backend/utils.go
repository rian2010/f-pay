package main

import (
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
	"time"
)

var jwtKey = []byte("jX8mT5xj7HXVTNpMQai8g6SnhmHKoAQvph4el54Y4u4=")

// Hash password
func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

func HasPin(pin string) (string, error) {
	hashedPin, err := bcrypt.GenerateFromPassword([]byte(pin), bcrypt.DefaultCost)
	return string(hashedPin), err
}

func CheckPassword(hash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

// func CheckPin(hash, pin string) bool {
// 	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(pin))
// 	return err == nil
// }

func CheckPin(storedPin, pin string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(storedPin), []byte(pin))
	return err == nil
}

// Generate JWT token
func GenerateToken(username string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
	})
	return token.SignedString(jwtKey)
}

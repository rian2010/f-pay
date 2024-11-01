package main

import (
	"fmt"
)

// Hello returns a greeting message.
func Hello(name string) string {
	// Return a greeting that embeds the name in a message.
	message := fmt.Sprintf("Hi, %v. Welcome!", name)
	return message
}

func main() {
	// Call the Hello function and print the result.
	fmt.Println(Hello("Alice"))
}

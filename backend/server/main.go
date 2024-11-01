package main

import (
	"fmt"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()

	app.Get("/", indexHandler)
	app.Post("/", postHandler)
	app.Put("/update", putHandler)
	app.Delete("/delete", deleteHandler)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	log.Fatalln(app.Listen(fmt.Sprintf(":%v", port)))
}

func indexHandler(c *fiber.Ctx) error {
	return c.SendString("Hello from GET")
}

func postHandler(c *fiber.Ctx) error {
	return c.SendString("Hello from POST")
}

func putHandler(c *fiber.Ctx) error {
	return c.SendString("Hello from PUT")
}

func deleteHandler(c *fiber.Ctx) error {
	return c.SendString("Hello from DELETE")
}

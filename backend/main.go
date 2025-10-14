package main

import (
	"ED/config"
	"ED/routes"
	"fmt"
	"log"
	"net/http"

	"github.com/rs/cors"
)

func main() {
	config.ConnectDatabase()

	// создаем маршрутизатор
	r := routes.SetupRouter()

	// настраиваем CORS (разрешаем запросы с фронта на http://localhost:3000)
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	// оборачиваем маршрутизатор
	handler := c.Handler(r)

	fmt.Println("Server running on port 8080 🚀")
	log.Fatal(http.ListenAndServe(":8080", handler))
}

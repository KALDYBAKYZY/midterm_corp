package routes

import (
	"ED/controllers"
	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	r := mux.NewRouter()

	// Users
	r.HandleFunc("/users", controllers.CreateUser).Methods("POST")
	r.HandleFunc("/users", controllers.GetUsers).Methods("GET")
	r.HandleFunc("/users/{id}", controllers.GetUser).Methods("GET")
	r.HandleFunc("/users/{id}", controllers.DeleteUser).Methods("DELETE")

	// Categories
	r.HandleFunc("/categories", controllers.CreateCategory).Methods("POST")
	r.HandleFunc("/categories", controllers.GetCategories).Methods("GET")

	// Tasks
	r.HandleFunc("/tasks", controllers.CreateTask).Methods("POST")
	r.HandleFunc("/tasks", controllers.GetTasks).Methods("GET")
	r.HandleFunc("/tasks/{id}", controllers.GetTask).Methods("GET")
	r.HandleFunc("/tasks/{id}", controllers.UpdateTask).Methods("PUT")
	r.HandleFunc("/tasks/{id}", controllers.DeleteTask).Methods("DELETE")

	return r
}

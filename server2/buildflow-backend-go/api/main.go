package main

import (
	"log"
	"os"

	"github.com/Aritra640/buildflow-backend-go/auth"
	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/Aritra640/buildflow-backend-go/internal/products"
	"github.com/Aritra640/buildflow-backend-go/internal/users"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)


func main() {

	err := godotenv.Load(); if err != nil {
		log.Println("Error: could not load .env file: " , err)
		panic(err)
	}


	config.App.Port = os.Getenv("PORT")
	config.App.DBconn = os.Getenv("DATABASE")
	config.App.Jwt = os.Getenv("JWT")
	log.Println("config loaded!")

	app := echo.New()

	app.POST("/signin" , auth.SigninHandler)
	app.POST("/signup" , users.AddUserHandler)
	app.GET("/getProducts" , products.GetProductByUserHandler)
	app.GET("/getProductsExample" , products.GetProductExampleHandler)
	app.POST("/addProduct" , products.AddProductsHandler)
	app.DELETE("/deleteProduct" , products.DeleteProductHandler)

	log.Println("Starting server")
	app.Logger.Fatal(app.Start(config.App.Port))
}

package users

import (
	"context"
	"database/sql"
	"log"

	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/Aritra640/buildflow-backend-go/internal/database/db"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

type AddUserParam struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

// Add user handler
func AddUserHandler(c echo.Context) error {

	var req AddUserParam 
	err := c.Bind(&req); if err != nil {
		log.Println("Error: cannot add user: " , err)
		return c.JSON(404 , "Invalid Request")
	}


	config.App.Mu.Lock()
	pg,err := sql.Open("postgres" , config.App.DBconn)
	config.App.Mu.Unlock()
	defer pg.Close()

	if err != nil {
		log.Println("Failed to create db connection: " , err)
		return c.JSON(500 , "Internal error")
	}
	
	queryobj := db.New(pg)

	queryobj.CreateUser(context.Background()  , db.CreateUserParams{
		Username: req.Username,
		Email: req.Email,
		Password: req.Password,
		AvatarUrl: sql.NullString{
			Valid: true,
			String: "dummy-url",
		},
	})


	return c.JSON(200 , "added user")
}

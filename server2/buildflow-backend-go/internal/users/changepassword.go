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

type ChangeUserpasswordparam struct {
	Username string `json:"username"`
	Email    string `json:"email"`
	Password string `json:"passoword"`
}

// Change user password
func ChangeUserPasswordHandler(c echo.Context) error {

	var req ChangeUserpasswordparam 
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
	queryobj.UpdateUserPasswordByUsername(context.Background() , db.UpdateUserPasswordByUsernameParams{
		Username: req.Username,
		Password: req.Password,
	})

	return c.JSON(200 , "password changed")
}

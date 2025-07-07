package auth

import (
	"context"
	"database/sql"
	"log"

	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/Aritra640/buildflow-backend-go/internal/database/db"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

type SigninParam struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SigninHandler
func SigninHandler(c echo.Context) error {

	var req SigninParam
	err := c.Bind(&req)
	if err != nil {
		log.Println("Error: Invaid request: ", err)
		return c.JSON(404, "Invalid request")
	}

	config.App.Mu.Lock()
	pg, err := sql.Open("postgres", config.App.DBconn)
	config.App.Mu.Unlock()
	defer pg.Close()

	if err != nil {
		log.Println("Failed to create db connection: ", err)
		return c.JSON(500, "Internal error")
	}

	queryobj := db.New(pg)

	user, err := queryobj.GetUserByEmail(context.Background(), req.Email)
	if err != nil {
		log.Println("Error: cannot get user details: ", err)
		return c.JSON(200, "User not found!")
	}

	access_token,err := CreateAuthToken(int(user.ID)); if err != nil {
		log.Println("Error: coulnd not create access token: ", err)
		return c.JSON(500 , "internal error")
	}


	return c.JSON(200 , map[string]interface{}{
		"access_token": access_token,
		"userid": user.ID,
	})
}

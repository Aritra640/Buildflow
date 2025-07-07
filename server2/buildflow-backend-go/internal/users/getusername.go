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

type GetUserNameParam struct {
	UserID int `json:"user_id"`
}

// get user name from id
func GetUserNameHandler(c echo.Context) error {

	var req GetUserNameParam
	err := c.Bind(&req)
	if err != nil {
		log.Println("Error: cannot add user: ", err)
		return c.JSON(404, "Invalid Request")
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
	useronj,_ := queryobj.GetUserByID(context.Background() , int32(req.UserID))

	return c.JSON(200 , map[string]interface{}{
		"username": useronj.Username,
	})
}

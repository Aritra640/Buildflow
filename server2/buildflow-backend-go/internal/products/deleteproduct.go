package products

import (
	"context"
	"database/sql"
	"log"

	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/Aritra640/buildflow-backend-go/internal/database/db"
	"github.com/labstack/echo/v4"
)

type DeleteProductParam struct {
	Id int `json:"pid"`
}

// Delete Product with product id
func DeleteProductHandler(c echo.Context) error {

	var req DeleteProductParam
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
	queryobj.DeleteProductByID(context.Background() , int32(req.Id))
	return c.JSON(200 , "product deleted")
}

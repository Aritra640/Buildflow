package products

import (
	"context"
	"database/sql"
	"log"

	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/Aritra640/buildflow-backend-go/internal/database/db"
	"github.com/labstack/echo/v4"
	_ "github.com/lib/pq"
)

type Products struct {
	Name    string `json:"name"`
	Desc    string `json:"desc"`
	OwnerID int    `json:"owner_id"`
	Status  string `json:"status"`
}

// Add products to the db --handler
func AddProductsHandler(c echo.Context) error {

	var req Products

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

	queryobj.CreateProduct(context.Background() , db.CreateProductParams{
		Name: req.Name,
		Description: sql.NullString{
			Valid: true,
			String: req.Desc,
		},
		Status: sql.NullString{
			Valid: true,
			String: req.Status,
		},
		OwnerID: sql.NullInt32{
			Valid: true,
			Int32: int32(req.OwnerID),
		},
	})
	
	return c.JSON(200 , "product created")
}



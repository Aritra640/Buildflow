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

type ProductByOwnerParam struct {
	OwnerID int `json:"user_id"`
}

type ProductsReturn struct {
	ID          int32  `json:"id"`
	ProductName string `json:"product_name"`
	Description string `json:"desc"`
	OwnerID     int32  `json:"user_id"`
}

// Get all products from user
func GetProductByUserHandler(c echo.Context) error {

	var req ProductByOwnerParam

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
	objarr, err := queryobj.GetProductsByOwner(context.Background(), sql.NullInt32{
		Valid: true,
		Int32: int32(req.OwnerID),
	})
	if err != nil {
		log.Println("Error: Something went wrong: ", err)
		return c.JSON(404, "Internal Server error")
	}

	returnobj := getProducts(objarr)

	return c.JSON(200, returnobj)
}

func getProducts(objarr []db.Product) []ProductsReturn {

	arr := make([]ProductsReturn, 0)
	for _, obj := range objarr {
		arr = append(arr, ProductsReturn{
			ID:          obj.ID,
			ProductName: obj.Name,
			Description: obj.Description.String,
			OwnerID:     obj.OwnerID.Int32,
		})
	}


	return arr
}

//Example handler for getProducts 
func GetProductExampleHandler(c echo.Context) error {
	
	arr := make([]ProductsReturn , 0)
	arr = append(arr, ProductsReturn{
		ID: 1,
		ProductName: "Test1",
		Description: "testing",
		OwnerID: 123,
	})
	arr = append(arr, ProductsReturn{
		ID: 2,
		ProductName: "Test2",
		Description: "testing",
		OwnerID: 12333,
	})


	return c.JSON(200 , arr)
}

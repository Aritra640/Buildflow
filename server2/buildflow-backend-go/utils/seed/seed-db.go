package seed

import (
	"context"
	"database/sql"
	"log"

	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/Aritra640/buildflow-backend-go/internal/database/db"
	_ "github.com/lib/pq"
)

//Seed users table 
func SeedUsersTable() error {
	pqChan := make(chan *sql.DB)
	errChan := make(chan error)
	defer close(pqChan)
	defer close(errChan)

	go func() {
		
		config.App.Mu.Lock()
		pg,err := sql.Open("postgres" , config.App.DBconn)
		config.App.Mu.Unlock()

		if err != nil {
			pg.Close()
			errChan <- err
		}
		pqChan <- pg
	}()

	select {
	case errq := <-errChan: 
		log.Println("Error in seeding user: " , errq)
		return errq

	case pqc := <-pqChan:
		log.Println("User table seeded")
		defer pqc.Close() 

		queryobj := db.New(pqc)
		queryobj.CreateUser(context.Background() , db.CreateUserParams{
			Username: "abcde",
			Email: "avcd@ab.com",
			Password: "1212",
			AvatarUrl: sql.NullString{
				Valid: true,
				String: "avatar-example-url",
			},
		})

		return nil
	}	
}

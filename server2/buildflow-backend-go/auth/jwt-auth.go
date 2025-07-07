package auth

import (
	"errors"
	"fmt"
	"log"
	"time"

	"github.com/Aritra640/buildflow-backend-go/config"
	"github.com/golang-jwt/jwt/v5"
)

type MyCustomClaims struct {
	UserID int `json:"user_id"`
	jwt.RegisteredClaims
}

func CreateAuthToken(UserID int) (string, error) {

	claims := MyCustomClaims{
		UserID,
		jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(config.App.Jwt)
	if err != nil {

		log.Println("Could not create jwt: ", err)
		return "", err
	}

	return ss, nil
}

func VerifyAuthToken(tokenString string) (int, error) {

	token, err := jwt.ParseWithClaims(tokenString, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method : %v", token.Header["alg"])
		}
		return config.App.Jwt, nil
	})

	if err != nil {
		log.Println("Error in parsing token: ", err.Error())
		return -1, err
	}

	claims, ok := token.Claims.(*MyCustomClaims)
	if !ok || !token.Valid {
		log.Println("Invalid token or claims ")
		return -1, errors.New("Error: cannot verify token")
	}

	log.Println("Token verification successfull for user-id : ", claims.UserID)
	return claims.UserID, nil
}

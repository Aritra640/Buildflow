package auth

import (
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func AuthMiddleware(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {

		jwtToken := c.Request().Header.Get("access_token")
		if jwtToken == "" {
			log.Println("Error: could not get auth header")
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "could not get jwt header!",
			})
		}

		log.Println("JWT: ", jwtToken)

		userid, err := VerifyAuthToken(jwtToken)
		if err != nil {
			log.Println("Error in verifying token !")
			return c.JSON(http.StatusBadRequest, map[string]string{
				"error": "could not berify token!",
			})
		}

		c.Request().Header.Add("userid", strconv.Itoa(userid))
		return next(c)
	}
}

package mail

import (
	"context"
	"fmt"
	"log"

	"github.com/labstack/echo/v4"
)

type MailParam struct {
	Username  string `json:"username"`
	UserEmail string `json:"useremail"`
}

func SendWishMailHandler(c echo.Context) error {

	var req MailParam
	err := c.Bind(&req)
	if err != nil {

		log.Println("Error: Invalid request: ", err)
		return c.JSON(404, "Invalid request")
	}

	bodyStr := fmt.Sprintf(`
<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h1 style="color: #333; text-align: center;">Hey %s 👋,</h1>

    <p style="font-size: 16px; color: #555; text-align: center;">
        Thanks for showing interest in our upcoming feature!
    </p>

    <p style="font-size: 16px; color: #555; text-align: center;">
        You've been added to the WatchList with the email: <strong style="color: #333;">%s</strong>
    </p>

    <p style="font-size: 16px; color: #555; text-align: center;">
        We're currently working hard to build something truly powerful for you. As soon as it's ready, you'll be the first to know!
    </p>

    <p style="font-size: 14px; color: #777; text-align: center;">
        In the meantime, feel free to explore our demo dashboard.
    </p>

    <div style="text-align: center; margin: 30px 0;">
        <a href="https://buildflow.example.com/demo-dashboard" style="display: inline-block; background-color: #e6007a; color: white; text-decoration: none; padding: 12px 24px; border-radius: 5px; font-size: 16px;">
            🚀 Try Demo Dashboard
        </a>
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

    <p style="text-align: center; font-size: 12px; color: #aaa;">
        &copy; 2025 BuildFlow Technologies. All rights reserved.
    </p>
</div>
`, req.UserEmail , req.UserEmail)


	err = SendMail(context.Background() , SendMailContent{
		senderEmail: req.UserEmail,
		emailSubject: "Welcome to Buildflow",
		emailBody: bodyStr,
	})
	
	if err != nil {
		log.Println("Error: cannot send mail : "  ,err)
		return c.JSON(500 , "Internal server error")
	}

	return c.JSON(200 , "mail sent")
}

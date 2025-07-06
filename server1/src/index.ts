import express from "express";
const app = express();

app.use(express.json());

app.get("health-check" , (req: express.Request , res:express.Response) => {
  res.send("server running")
});

app.listen(8080);

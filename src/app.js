import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
})

app.listen(5000, console.log("Listening on 5000"));
import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

app.post("/sign-up", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.post("/sign-in", (req, res) => {
  console.log(req.body);

  const authorizedUser = { ...req.body, token: "shsdf3sd2f12d1f3sd2" };
  res.status(200).send(authorizedUser);
});

app.listen(5000, console.log("Listening on 5000"));
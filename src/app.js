import express, { json } from "express";
import cors from "cors";
import { signIn, signUp } from "./controllers/authController.js";

const app = express();
app.use(json());
app.use(cors());

app.post("/auth/sign-up", signUp);

app.post("/auth/sign-in", signIn);

app.listen(5000, console.log("Listening on 5000"));
import express, { json } from "express";
import cors from "cors";
import route from "./routes/index.js";

const app = express();
app.use(json());
app.use(cors());
app.use(route);

app.listen(process.env.PORT, console.log(`Listenning on port ${process.env.PORT}`));
import { Router } from "express";
import authRouter from "./authRouter.js";
import transactionsRouter from "./transactionsRouter.js";

const route = Router();
route.use(authRouter);
route.use(transactionsRouter);

export default route;
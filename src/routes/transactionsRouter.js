import { Router } from "express";
import { getTransactions } from "../controllers/transactionsController.js";
import { tokenValidationMiddleware } from "../middlewares/index.js";

const transactionsRouter = Router();
transactionsRouter.get("/transactions", tokenValidationMiddleware, getTransactions);
//transactionsRouter.post("/transactions", loginSchemaValidatorMiddleware, signIn);

export default transactionsRouter;
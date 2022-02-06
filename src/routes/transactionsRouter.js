import { Router } from "express";
import { getTransactions, saveTransactions } from "../controllers/transactionsController.js";
import { tokenValidationMiddleware, transactionSchemaValidationMiddleware } from "../middlewares/index.js";

const transactionsRouter = Router();
transactionsRouter.use(tokenValidationMiddleware);
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.post("/transactions", transactionSchemaValidationMiddleware,saveTransactions);

export default transactionsRouter;
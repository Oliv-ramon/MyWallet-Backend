import { Router } from "express";
import { getTransactions, saveTransactions, deleteTransaction } from "../controllers/transactionsController.js";
import { tokenValidationMiddleware, transactionSchemaValidationMiddleware, transactionExistValidationMiddleware } from "../middlewares/index.js";

const transactionsRouter = Router();
transactionsRouter.use(tokenValidationMiddleware);
transactionsRouter.get("/transactions", getTransactions);
transactionsRouter.post("/transactions", transactionSchemaValidationMiddleware,saveTransactions);
transactionsRouter.delete("/transactions/:id", transactionExistValidationMiddleware, deleteTransaction);

export default transactionsRouter;
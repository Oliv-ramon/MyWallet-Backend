import db from "../db.js";
import { ObjectId } from "bson";

export default async function transactionExistValidationMiddleware(req, res, next) {
  const transactionId = req.params.id;
console.log(transactionId)
  try {
    const transaction = await db.collection("transactions").findOne({ _id: new ObjectId(transactionId) });
    if (!transaction) return res.sendStatus(404);
    
    res.locals.transactionId = transaction._id;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}
import dayjs from "dayjs";
import db from "../db.js";

export async function getTransactions(req, res) {
  const userId = res.locals.userId;
    
  try {
    const userTransactions = await db.collection("transactions").find({ userId }).toArray();
  
    res.status(200).send(userTransactions.reverse());
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function saveTransactions(req, res) {
  const transaction = req.body;
  const userId = res.locals.userId;
  const fixedValue = Number(transaction.value).toFixed(2);

  try {
    db.collection("transactions").insertOne(
      {
        ...transaction,
        value: fixedValue,
        userId,
        date: dayjs().format("DD/MM"),
      }
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
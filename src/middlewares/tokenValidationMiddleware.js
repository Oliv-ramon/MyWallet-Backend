import db from "../db.js";

export default async function tokenValidationMiddleware(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const session = await db.collection("sessions").findOne({ token });
    if (!session) return res.sendStatus(401);
  
    const userTransactions = await db.collection("transactions").find({ userId: session.userId }).toArray();
    
    res.locals.transactions = userTransactions;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

  next();
}
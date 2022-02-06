import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  delete user.passwordConfirm;

  try {  
    const passwordHashed = bcrypt.hashSync(user.password, 10);

    const userExisting = await db.collection("users").find({ $or: [ {name: user.name}, {email: user.email} ] }).toArray();

    console.log(userExisting)
    if (userExisting.length > 0) return res.sendStatus(409);

    await db.collection("users").insertOne({ ...user, password: passwordHashed });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const login = req.body;

  try {  
    const user = await db.collection("users").findOne({ email: login.email });
    if (!user) return res.sendStatus(401);
  
    const isntTheUser = !bcrypt.compareSync(login.password, user.password);
    if (isntTheUser) return res.sendStatus(401);

    const token = uuid();

    await db.collection("sessions").insertOne({ userId: user._id, token });
    res.status(200).send({ token, userName: user.name });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
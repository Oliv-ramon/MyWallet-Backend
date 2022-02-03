import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import db from "../db.js";

const userSchema = joi.object(
  { 
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirm: joi.ref("password")
  }
);

const loginSchema = joi.object(
  {
    email: joi.string().email().required(),
    password: joi.string().required(),
  }
);

export async function signUp(req, res) {
  const user = req.body;

  const userValidation = userSchema.validate(user, {  abortEarly: false });

  if (userValidation.error) {
    const errors = userValidation.error.details.map(({message}) => message).join(", ");
    const errorMessage = `Errors: ${errors}`
    return res.status(422).send(errorMessage);
  };

  delete user.passwordConfirm;

  try {  
    const passwordHashed = bcrypt.hashSync(user.password, 10);

    const userExisting = await db.collection("users").findOne({ name: user.name, email: user.email });

    if (userExisting) return res.sendStatus(409);

    await db.collection("users").insertOne({ ...user, password: passwordHashed });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const login = req.body;

  const loginValidation = loginSchema.validate(login, {  abortEarly: false });

  if (loginValidation.error) {
    const errors = loginValidation.error.details.map(({message}) => message).join(", ");
    const errorMessage = `Errors: ${errors}`
    return res.status(422).send(errorMessage);
  };

  try {  
    const user = await db.collection("users").findOne({ email: login.email });
    if (!user) return res.sendStatus(401);
  
    const isntTheUser = !bcrypt.compareSync(login.password, user.password);
    console.log(user.password, login.password)
    if (isntTheUser) return res.sendStatus(401);

    const token = uuid();

    await db.collection("sessions").insertOne({ userId: user._id, token });
    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
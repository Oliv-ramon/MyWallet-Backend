import { Router } from "express";
import { signIn, signUp } from "../controllers/authController.js";
import { userSchemaValidatorMiddleware, loginSchemaValidatorMiddleware } from "../middlewares/index.js";


const authRouter = Router();
authRouter.post("/auth/sign-up", userSchemaValidatorMiddleware, signUp);
authRouter.post("/auth/sign-in", loginSchemaValidatorMiddleware, signIn);

export default authRouter;
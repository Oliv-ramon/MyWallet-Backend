import { loginSchema } from "../schemas/index.js";

export default function loginSchemaValidatorMiddleware(req, res, next) {
  const loginValidation = loginSchema.validate(req.body, {  abortEarly: false });

  if (loginValidation.error) {
    const errors = loginValidation.error.details.map(({message}) => message).join(", ");
    const errorMessage = `Errors: ${errors}`
    return res.status(422).send(errorMessage);
  };

  next();
}
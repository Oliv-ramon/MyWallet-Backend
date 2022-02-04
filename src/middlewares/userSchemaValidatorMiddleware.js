import { userSchema } from "../schemas/index.js";

export default function userSchemaValidatorMiddleware(req, res, next) {
  const userValidation = userSchema.validate(req.body, {  abortEarly: false });

  if (userValidation.error) {
    const errors = userValidation.error.details.map(({message}) => message).join(", ");
    const errorMessage = `Errors: ${errors}`
    return res.status(422).send(errorMessage);
  };

  next();
}
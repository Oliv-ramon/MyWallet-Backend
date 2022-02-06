import { transactionSchema } from "../schemas/index.js";

async function transactionSchemaValidationMiddleware(req, res, next) {
  const transactionValidation = transactionSchema.validate(req.body, {  abortEarly: false });
  console.log(req.body)


  if (transactionValidation.error) {
    const errors = transactionValidation.error.details.map(({message}) => message).join(", ");
    const errorMessage = `Errors: ${errors}`
    return res.status(422).send(errorMessage);
  };

  next();
}

export default transactionSchemaValidationMiddleware;
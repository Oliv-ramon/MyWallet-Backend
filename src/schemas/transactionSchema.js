import joi from "joi";
  
const transactionSchema = joi.object(
  {
    value: joi.string().pattern(/^[0-9]+.[0-9]+$/).required(),
    description: joi.string().required(),
    type: joi.valid("entry", "exit").required(),
  }
);

export default transactionSchema;
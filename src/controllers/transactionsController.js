export async function getTransactions(req, res) {
  const transactions = res.locals.transactions;

  res.status(200).send(transactions);
}
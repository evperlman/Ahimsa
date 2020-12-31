const express = require("express");
const dbController = require("../controllers/dbController.js");
const plaidController = require("../controllers/plaidController.js");
const router = express.Router();

//post route runs on login, request body contains user_id
// router.post(
//   "/updatedatabase",
//   dbController.getItems,
//   plaidController.getTransactionsFromApi,
//   // dbController.updateDatabaseItems,
//   dbController.updateDatabaseAccounts,
//   dbController.updateDatabaseTransactions,
//   (req, res) => {
//     return res.status(200).json('database updated');
//   }
// );

router.post("/get_items", dbController.getItems, (req, res) => {
  return res.status(200).json(res.locals.items);
})

//get accounts based on user_id
router.post("/getaccounts",
dbController.getExistingAccounts,
(req, res) => {
  return res.status(200).json(res.locals.servedAccounts);
}
)

//get transactions based on account_id
router.get("/gettransactions/:account_id", dbController.getTransactions, (req, res) => {
  console.log('SENDING OUT>>>>', res.locals.transactions)
  return res.status(200).json(res.locals.transactions);
})





module.exports = router;

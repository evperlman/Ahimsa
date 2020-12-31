const express = require("express");
const dbController = require("../controllers/dbController.js");
const plaidController = require("../controllers/plaidController.js");
const router = express.Router();

// gets all transactions from the database for a specific user - also invoked when we /get_transactions in the plaid.js file
router.get("/userinfo/", dbController.getBankTransactions, (req, res) => {
  return res.status(200).json(res.locals.data);
});

//Adds transaction information to the database from the Plaid API given user credentials
//this functionality is included in the "GET" request in 'plaid.js'.
router.post("/post_data", dbController.addBankTransactions, (req, res) => {
  return res.status(200).json("success");
});

//post route runs on login, request body contains user_id
router.post(
  "/login",
  plaidController.getTransactionsFromApi,
  dbController.updateDatabaseAccounts,
  dbController.updateDatabaseTransactions,
  (req, res) => {
    console.log('SENDING OUT>>>>', [res.locals.servedTransactions])
    return res.status(200).json([res.locals.servedTransactions, res.locals.servedAccounts]);
  }
);

router.post("/dbpull",
dbController.getExistingAccounts,
dbController.getInitialTransactions,
(req, res) => {
  console.log('SENDING OUT>>>>', [res.locals.servedTransactions])
  return res.status(200).json([res.locals.servedTransactions, res.locals.servedAccounts]);
}
)


//deprecated route. used during development to test database querying / inserting rows.
router.post("/userinfo", dbController.addBankInfo, (req, res) => {
  return res.status(200).json("success");
});

module.exports = router;

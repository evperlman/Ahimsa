const express = require("express");
const plaidController = require("../controllers/plaidController.js");
const router = express.Router();
const dbController = require("../controllers/dbController.js");

//fires on dropdown menu from link account, add req.body.user_id
router.post("/get_link_token", plaidController.getLinkToken, (req, res) => {
  return res.status(200).json(res.locals.linkToken);
});

//fires when account is linked, saves item in DB, add req.body.user_id
router.post(
  "/get_access_token",
  plaidController.getAccessToken,
  dbController.saveItem,
  plaidController.getTransactionsFromApi,
  dbController.updateDatabaseAccounts,
  dbController.updateDatabaseTransactions,
  // dbController.getExistingAccounts,
  (req, res) => {
    return res.status(200).json(res.locals.servedAccounts);
  }
);

//get items based on user_id
router.post("/get_items", dbController.getItems, (req, res) => {
  return res.status(200).json(res.locals.item_ids);
});

module.exports = router;

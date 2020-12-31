const db = require("../pool.js");
const plaidController = {};

// Plaid configuration
const plaid = require("plaid");
const { request } = require("http");
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
  options: {
    version: "2020-09-14",
  },
});

// We store the access_token in memory - in production, store it in a secure
// persistent data store.
let ACCESS_TOKEN = "";

/**
 * @desc      Lets users link their accounts to Plaid
 * @route     POST /get_link_token
 */
plaidController.getLinkToken = (request, response, next) => {
  let linkToken;
  client
    .createLinkToken({
      user: {
        client_user_id: "user-id",
      },
      client_name: "Plaid QuickStart",
      products: ["transactions"],
      country_codes: ["US"],
      language: "en",
    })
    .then((token) => {
      linkToken = token.link_token;
      response.locals.linkToken = linkToken;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
};

/**
 * @desc    Begin token exchange flow (public token for access token)
 *          Access token allows us to make authenticated calls to Plaid API.
 * @route   POST /get_access_token
 */
plaidController.getAccessToken = (req, res, next) => {
  PUBLIC_TOKEN = req.body.public_token;

  client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse) {
    if (error != null) {
      console.log("Could not exchange public_token!");
      return next(error);
    }

    res.locals.access_token = tokenResponse.access_token;
    res.locals.item_id = tokenResponse.item_id;
    console.log("Got public access Token");
    return next();
  });
};

/**
 * @desc    Update db based on new Plaid transactions.
 * @route   POST /database/updatedatabase,
 * controllers: getItems, getTransactionsFromApi,  update last_login of items, update accounts, update transactions
 */

//get transactions from api based on item access token and last login
plaidController.getTransactionsFromApi = (req, res, next) => {
  client
    .getTransactions(res.locals.access_token, "2020-11-01", "2020-12-30")
    .then((data) => {
      
      
      console.log(data)
      res.locals.transactions = data.transactions;
      res.locals.accounts = data.accounts;
      console.log("Got transactions from api")
      return next();
    });
};

module.exports = plaidController;

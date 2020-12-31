const { Client } = require("pg");
const database = new Client(process.env.DB_URL);
database.connect();

const plaidController = {};


// Plaid configuration
const plaid = require('plaid'); 
const { request } = require('http');
const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox, 
  options: {
    version: '2020-09-14',
  },
});

// We store the access_token in memory - in production, store it in a secure
// persistent data store.
let ACCESS_TOKEN = '';


/**
 * @desc      Lets users link their accounts to Plaid
 * @route     POST /get_link_token
 */
plaidController.getLinkToken = (request, response, next) => {
// plaid post request - will create the route / controllers later. 
    let linkToken;
    client.createLinkToken({
      user: {
        client_user_id: 'user-id',
      },
      client_name: 'Plaid QuickStart',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
    }).then(
      token => {
      linkToken = token.link_token
      response.locals.linkToken = linkToken
      return next()
    }).catch((err) => {
      console.log(err)
      return next(err);
    });
  };

/**
 * @desc    Begin token exchange flow (public token for access token)
 *          Access token allows us to make authenticated calls to Plaid API.
 * @route   POST /get_access_token
 */
plaidController.getAccessToken = (request, response, next) => {

    PUBLIC_TOKEN = request.body.public_token;
  // Exchange client-side public_token for a server access_token.
    client.exchangePublicToken(PUBLIC_TOKEN, function (error, tokenResponse){
      if (error != null) {
        const msg = 'Could not exchange public_token!';
        console.log(msg + '\n' + JSON.stringify(error));
        return next(error); 
      }
  
      //delete later
      ACCESS_TOKEN = tokenResponse.access_token;
      ITEM_ID = tokenResponse.item_id;
     
      const params = [tokenResponse.item_id, '1', tokenResponse.access_token, '2020-12-01'];
      const text = `INSERT INTO items ( item_id, user_id, access_token, last_login ) VALUES ($1, $2, $3, $4);`
      database.query(text, params, (err, res) => {
        if (err) next(err)
        else {
          console.log("Inserted Access Token into items table successfully.");
          return next();
        }
      })
      // return next();
    });
};

/**
 * @desc    Fetching transaction data
 * @route   GET /get_transactions
 */

//Use the date arguments in getTransactions to only fetch transactions between
//last login and now, add all NEW transactions in database
//add login_date to item table, update that date on login
//so we only ping database for latest data, if first login, search back 30 days

//whenever we get account list, query for each account returned, if found, update balance
//if not found, create new
plaidController.getTransactions = (request, response, next) => {
  client.getTransactions(ACCESS_TOKEN,'2020-12-01','2020-12-25')
  .then(data => {
    //add transactions to the database
    console.log('data >>>', data);
    const transactions = data.transactions; //array of transactions delivered from the database. 
    const simpTransactions = []; 
    const simpAccounts = [];
    let accountRef = {};
    console.log(data)

    data.accounts.forEach((account) => {
      let accountsInfo = {};
      accountRef[account.account_id] = account.subtype;
      accountsInfo.account_id = account.account_id
      accountsInfo.account_subtype = account.subtype
      accountsInfo.account_name = account.official_name
      accountsInfo.account_balance = account.balances.current 

      simpAccounts.push(accountsInfo)
    });
    
    transactions.forEach((trx) => {
      //trx is one transaction object.
      let simpTrx = {
        account_id: trx.account_id, 
        merchant_name: trx.merchant_name, 
        amount: trx.amount, 
        account_type: accountRef[trx.account_id], 
        date_of_transaction: trx.date, 
        category: trx.category[0], 
        transaction_id: trx.transaction_id, 
      }; 

      simpTransactions.push(simpTrx);
      
    })
    
    request.body = [simpTransactions, simpAccounts]
    return next();
  }).catch((err) => {
    console.log('error : ' + err)
    return next(err)
  });
};

/**
 * @desc    Update database based on new Plaid transactions.
 * @route   GET /get_transactions
 */
plaidController.getTransactionsFromApi = (request, response, next) => {
  response.locals.transactions = []
  response.locals.accounts = []
  response.locals.item_ids = []
  const { user_id } = request.body
  const accounts = []
  //query database for all items that relate to user_id
  const text = `SELECT * FROM items WHERE user_id=${user_id} AND NOT last_login='2020-12-25';`;
  // 

  database.query(text, (err, result) => {
    if (err) {
      return next(err)
    } else {
      // console.log(res.rows);

      result.rows.forEach((item)=>{
        response.locals.item_ids.push(item.item_id)

        //if its the first item in this array
        client.getTransactions(item.access_token, item.last_login,'2020-12-25')
        .then((data)=>{
          response.locals.transactions.push(...data.transactions)
          response.locals.accounts.push(...data.accounts)
          
          return next()
        })

        //query item for accounts
        //query item for transactions
      })
    }
  })



  //loop through items, query each one that has join_date that isnt 2020-12-25
  // for (let i = 0; i < items.length; i++) {
  //   const text = `S`
  //   if (item[i].last_login !== '2020-12-25') {
  //     //do the query, push the rows into accounts array
  //   }
  // }

}



  module.exports = plaidController; 
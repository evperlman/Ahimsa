const { Client } = require('pg');
const database = new Client('postgres://cjcfvoek:7uijjLGHc90B-ztkZPf4p3xdYgjHBlvO@suleiman.db.elephantsql.com:5432/cjcfvoek');
database.connect()

const dbController = {};

//we would want to change this for a specific user_id
/**
 * @desc    Selects all rows from the transactions table.
 * @route   GET /userinfo
 */
dbController.getBankTransactions = (request, response, next) => {
  const queryText = 'SELECT * FROM user_transactions';
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err)
    } else {
      response.locals.transactions = res.rows; 
      return next();
    }
  });
};

/**
 * 
 */
dbController.getBankAccounts = (request, response, next) => {
  const queryText = 'SELECT * FROM account_information;' 
  database.query(queryText, (err, res) => {
    if(err){
      return next(err); 
    } else {
      response.locals.accounts = res.rows; 
      return next(); 
    }
  })
}

// deprecated method that allows developers to insert rows in. not used in any middleware routes. 
dbController.addBankInfo = (request, response, next) => {
  const queryValues = request.body.data
  const queryText = `INSERT INTO user_transactions ${queryValues};`;
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err)
    } else {
      console.log('completed query')
      return next();
    }
  });
};

// Adds all transactions from the Plaid API in accordance with the predefined schema for what a transaction should look like 
/**
 * @route     POST /post_data
 * @reqbody   { }
 */
dbController.addBankTransactions = (request, response, next) => {
  const queryValues = request.body[0];
  let queryText = 'INSERT INTO user_transactions (account_id, transaction_id, merchant_name, amount, account_type, date_of_transaction, category) VALUES'
  // this regular expression replace iterative loop replaces all single apostrophe's "'" with two apostrophe's "''" so SQL can read the requests. In our dummy data this only applies to "McDonald's"
  let reg = /'/

  //create a big query block
  for (let i = 0; i < queryValues.length; i++){
    if (queryValues[i].merchant_name !== null){
      queryValues[i].merchant_name = queryValues[i].merchant_name.replace(reg,"''");
    }
    if (i === queryValues.length - 1){
      queryText += `('${queryValues[i].account_id}', '${queryValues[i].transaction_id}', '${queryValues[i].merchant_name}', ${queryValues[i].amount}, '${queryValues[i].account_type}', '${queryValues[i].date_of_transaction}', '${queryValues[i].category}');`
    } else {
    queryText += ` ('${queryValues[i].account_id}', '${queryValues[i].transaction_id}', '${queryValues[i].merchant_name}', ${queryValues[i].amount}, '${queryValues[i].account_type}', '${queryValues[i].date_of_transaction}', '${queryValues[i].category}'),`
  }};

  //make query with giant query block
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err)
    } else {
      return next();
    }
  });
};


dbController.addAccounts = (request, response, next) => {
  const queryValues = request.body[1];
  
  let queryText = 'INSERT INTO account_information (account_id, account_subtype, account_name, account_balance) VALUES'

  queryValues.forEach((account) => {
    queryText += `('${account.account_id}', '${account.account_subtype}', '${account.account_name}', '${account.account_balance}'),`
  })

  queryText = queryText.slice(0,queryText.length-1) + ';';
  
  
  database.query(queryText, (err, res) => {
    if(err){
      return next(err); 
    } else {
      return next(); 
    }
  })
}

module.exports = dbController;

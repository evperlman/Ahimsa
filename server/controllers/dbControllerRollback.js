const { Client } = require("pg");
const database = new Client(process.env.DB_URL);
database.connect();

const db = require("../pool.js");

const dbController = {};

//we would want to change this for a specific user_id
/**
 * @desc    Selects all rows from the transactions table.
 * @route   GET /userinfo
 */
dbController.getBankTransactions = (request, response, next) => {
  const queryText = "SELECT * FROM user_transactions";
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err);
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
  const queryText = "SELECT * FROM account_information;";
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err);
    } else {
      response.locals.accounts = res.rows;
      return next();
    }
  });
};

// deprecated method that allows developers to insert rows in. not used in any middleware routes.
dbController.addBankInfo = (request, response, next) => {
  const queryValues = request.body.data;
  const queryText = `INSERT INTO user_transactions ${queryValues};`;
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err);
    } else {
      console.log("completed query");
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
  let queryText =
    "INSERT INTO user_transactions (account_id, transaction_id, merchant_name, amount, account_type, date_of_transaction, category) VALUES";
  // this regular expression replace iterative loop replaces all single apostrophe's "'" with two apostrophe's "''" so SQL can read the requests. In our dummy data this only applies to "McDonald's"
  let reg = /'/;

  //create a big query block
  for (let i = 0; i < queryValues.length; i++) {
    if (queryValues[i].merchant_name !== null) {
      queryValues[i].merchant_name = queryValues[i].merchant_name.replace(
        reg,
        "''"
      );
    }
    if (i === queryValues.length - 1) {
      queryText += `('${queryValues[i].account_id}', '${queryValues[i].transaction_id}', '${queryValues[i].merchant_name}', ${queryValues[i].amount}, '${queryValues[i].account_type}', '${queryValues[i].date_of_transaction}', '${queryValues[i].category}');`;
    } else {
      queryText += ` ('${queryValues[i].account_id}', '${queryValues[i].transaction_id}', '${queryValues[i].merchant_name}', ${queryValues[i].amount}, '${queryValues[i].account_type}', '${queryValues[i].date_of_transaction}', '${queryValues[i].category}'),`;
    }
  }

  //make query with giant query block
  database.query(queryText, (err, res) => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};

dbController.addAccounts = (request, response, next) => {
  const queryValues = request.body[1];

  let queryText =
    "INSERT INTO account_information (account_id, account_subtype, account_name, account_balance) VALUES";

  queryValues.forEach((account) => {
    queryText += `('${account.account_id}', '${account.account_subtype}', '${account.account_name}', '${account.account_balance}');`;
  });

  // queryText = queryText.slice(0,queryText.length-1) + ';';

  database.query(queryText, (err, res) => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};

dbController.updateDatabaseAccounts = (request, response, next) => {
  let accountInsert =
    "INSERT INTO accounts (account_id, account_name, account_balance, account_subtype, item_id, user_id) VALUES ";
  let accountQuery = accountInsert;
  response.locals.accounts.forEach((account) => {
    accountQuery += `('${account.account_id}', '${account.name}',  
    ${account.balances.current}, '${account.subtype}', 'pKobXPaz8ZieeAQnlVlmtW7rzlwG96cpKvMNJ', ${request.body.user_id}),`;
  });

  accountQuery = accountQuery.slice(0, accountQuery.length - 1) + ";";

  database.query(accountQuery, (err, result) => {
    if (err) {
      console.log("error in updateDatabaseAccounts");
    }
    console.log("finish update database accounts");
    return next();
  });
};

dbController.updateDatabaseTransactions = (request, response, next) => {
  /**
 * CREATE TABLE transactions (
    "transaction_id" varchar NOT NULL,
    "account_id" varchar NOT NULL,
    "transaction_amount" int NOT NULL,
    "transaction_date" varchar NOT NULL,
    "merchant_name" varchar ,
    "transaction_description" varchar NOT NULL,
    "category" varchar,
    PRIMARY KEY ("transaction_id")
) WITH (
    OIDS=FALSE
);
 */
  let rowIdCount = 0;
  let transactionInsert = `
  INSERT INTO transactions (row_id, transaction_id, account_id, transaction_amount, 
  transaction_date, merchant_name, transaction_description,
  category) VALUES 
  `;

  let transactionQuery = transactionInsert;
  response.locals.transactions.forEach((transaction) => {
    let reg = /'/;

    if (transaction.merchant_name !== null) {
      transaction.merchant_name = transaction.merchant_name.replace(reg, "''");
    }
    // if (queryValues[i].merchant_name !== null){
    //   queryValues[i].merchant_name = queryValues[i].merchant_name.replace(reg,"''");
    // }

    transactionQuery += `('${rowIdCount++}', '${
      transaction.transaction_id
    }', '${transaction.account_id}', ${transaction.amount},  
  '${transaction.date}', '${transaction.merchant_name}', 'UBER RIDE', '${
      transaction.category[0]
    }'),`;
  });

  transactionQuery = transactionQuery.slice(0, transactionQuery.length - 1);
  transactionQuery += ";";

  // console.log('TRANSACTION.QUERY >>>>>', transactionQuery);

  database.query(transactionQuery, (err, result) => {
    if (err) {
      console.log('error in updateDatabaseTransactions');
    }
    console.log("finish updateDatabaseTransactions");
    return next();
  });
};

//saves accounts and transactions based on first account on res.locals based on user_id
dbController.getExistingAccounts = (request, response, next) => {
  const { item_ids } = response.locals;
  const { user_id } = request.body;

  const text = `SELECT * FROM accounts WHERE user_id = '${user_id}';`;
  // database.query(text, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     // return next(err)
  //   }
  //   response.locals.servedAccounts = result.rows;
  //   console.log("SAVED SERVED ACCOUNTS ON LOCALS");
  //   return next();
  // })

  database.query(text, (err, result) => {
    console.log('executed getExistingAccounts')
    return result
  })
  .then((result) => {
    
    response.locals.servedAccounts = result.rows;
    console.log("finish getExistingAccounts");
    return next();
  })
};

dbController.getInitialTransactions = (request, response, next) => {
  const text_transactions = `SELECT * FROM transactions WHERE account_id = '${response.locals.accounts[0].account_id}';`;
  console.log("TRANSACTIONS QUERY>>>>>", text_transactions);
  // database.query(text_transactions, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     // return next(err);
  //   }
  //   response.locals.servedTransactions = result.rows;
  //   console.log("RESPONSE.LOCALS>>>>", response.locals.servedTransactions);
  //   return next();
  // });

  database.query(text_transactions, (err, result) => {
    console.log('executed getInitialTransactions')
    return result
  })
  .then((result) => {
    
    response.locals.servedTransactions = result.rows;
    console.log("RESPONSE.LOCALS>>>>", response.locals.servedTransactions);
    return next();
  })
};

module.exports = dbController;

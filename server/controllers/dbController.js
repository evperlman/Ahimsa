const db = require("../pool.js");
const dbController = {};

//fires on login, updates accounts based on user_id
dbController.updateDatabaseAccounts = (request, response, next) => {
  let accountInsert =
    "INSERT INTO accounts (account_id, account_name, account_balance, account_subtype, item_id, user_id) VALUES ";
  let accountQuery = accountInsert;
  response.locals.accounts.forEach((account) => {
    accountQuery += `('${account.account_id}', '${account.name}',  
    ${account.balances.current}, '${account.subtype}', 'pKobXPaz8ZieeAQnlVlmtW7rzlwG96cpKvMNJ', ${request.body.user_id}),`;
  });

  accountQuery = accountQuery.slice(0, accountQuery.length - 1) + ";";

  db.query(accountQuery, (err, result) => {
    if (err) {
      console.log("error in updateDatabaseAccounts");
    }
    console.log("finish update db accounts");
    return next();
  });
};

//fires on login, updates transactions based on user_id
dbController.updateDatabaseTransactions = (request, response, next) => {
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
    transactionQuery += `('${rowIdCount++}', '${
      transaction.transaction_id
    }', '${transaction.account_id}', ${transaction.amount},  
  '${transaction.date}', '${transaction.merchant_name}', 'UBER RIDE', '${
      transaction.category[0]
    }'),`;
  });

  transactionQuery = transactionQuery.slice(0, transactionQuery.length - 1);
  transactionQuery += ";";

  db.query(transactionQuery, (err, result) => {
    if (err){
      console.log(err)
    }
    console.log("successfully updated transactions table")
    return next()
  })
};

//saves accounts and transactions based on first account on res.locals based on user_id
dbController.getExistingAccounts = (request, response, next) => {
  const { user_id } = request.body;

  const text = `SELECT * FROM accounts WHERE user_id = '${user_id}';`;
  db.query(text, (err, result) => {
    if (err) {
      console.log(err);
    }
    response.locals.servedAccounts = result.rows;
    console.log("SAVED SERVED ACCOUNTS ON LOCALS");
    return next();
  })
};

//fires when a sidebar button is clicked, gets transactions based on account_id in params
dbController.getTransactions = (req, res, next) => {
  const params = [req.params.account_id]
  console.log(req.params.account_id)
  const text = "SELECT * FROM transactions WHERE account_id = $1;"
  db.query(text, params, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.locals.transactions = result.rows;
    return next();
  })
}


//get items based on body.user.id, save on res.locals.item_ids (array)
dbController.getItems = (req, res, next) => {
  res.locals.items = [];
  const { user_id } = req.body;
  const text = `SELECT * FROM items WHERE user_id=${user_id} AND NOT last_login='2020-12-30';`;
  db.query(text, (err, result) => {
    if (err) {
      console.log(err);
    }

    //save each item on res.locals
    result.rows.forEach((item) => {
      res.locals.items.push(item);
    });

    return next();
  });
};

dbController.saveItem = (req, res, next) => {
  const params = [
    res.locals.item_id,
    req.body.user_id,
    res.locals.access_token,
    "2020-12-01",
  ];

  const text = `INSERT INTO items ( item_id, user_id, access_token, last_login ) VALUES ($1, $2, $3, $4);`;
  db.query(text, params, (err, res) => {
    if (err) next(err);
    else {
      console.log("Inserted new item into items table successfully.");
      return next();
    }
  });
}

module.exports = dbController;

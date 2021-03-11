import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import Landing from './Landing.jsx';
import SignIn from './SignIn.jsx';
import Signup from './Signup.jsx';
import myContext, { holder } from '../contexts/GlobalContext.jsx'
import axios from 'axios'

const App = () => {

  //Declare all state variables inside App
  const [user, setUser] = useState({});
  const [accounts, setAccounts] = useState([]); 
  const [transactions, setTransactions] = useState([]); 
  const [currentAccount, setCurrentAccount] = useState({});

  //fetch user, accounts and transactions for the first account and update state here 
  useEffect(() => {

    // PARSE USER OBJECT AND FEED IT TO SET USER

    // PARS ACCOUNTS ARRAY AND FEED IT TO FEED TO ACCOUNTS LIST
    setAccounts([
    {account_name: 'Plaid Checking', account_id: 'enwfn383n48g6', account_subtype: 'Checking',account_balance: 69},
    {account_name: 'Plaid Banking', account_id: 'naotherone', account_subtype: 'Savings', account_balance: 69}, 
    {account_name: 'Plaid big tester', account_id: 'tttttttt48g6', account_subtype: 'IRA', account_balance: 70}])

  
    setCurrentAccount({
      account_id: 'yBDqZZbGZ5HX7GBrw654cpDGKWlP4ztyw43j8',
      account_subtype: 'Checking',
      account_name: 'Plaid TEST',
      account_balance: 100
    })

    // PARSE TRANSACTRIONS OBJECT AND FEED IT TO SET USER
    setTransactions([
      {
      id: 1,
      transaction_amount: 500, 
      transaction_date: '12-22-2020', 
      merchant_name: 'Test', 
      category: 'Food', 
      account_name: 'Plaid Checking'
    },
    {
      id: 2,
      transaction_amount: 150, 
      transaction_date: '12-22-2020', 
      merchant_name: 'Test', 
      category: 'Entertainment', 
      account_name: 'Plaid Checking'
    },
    {
      id: 2,
      transaction_amount: 70, 
      transaction_date: '12-22-2020', 
      merchant_name: 'Test', 
      category: 'Travel', 
      account_name: 'Plaid Checking'
    },
    {
      id: 3,
      transaction_amount: 200, 
      transaction_date: '12-22-2020', 
      merchant_name: 'KFC', 
      category: 'Travel', 
      account_name: 'Plaid Checking'
    },
    {
      id: 4,
      transaction_amount: 200, 
      transaction_date: '12-22-2020', 
      merchant_name: 'KFC', 
      category: 'Travel', 
      account_name: 'Plaid Checking'
    },
    {
      id: 5,
      transaction_amount: 200, 
      transaction_date: '12-22-2020', 
      merchant_name: 'KFC', 
      category: 'Travel', 
      account_name: 'Plaid Checking'
    },
    {
      id: 5,
      transaction_amount: 350, 
      transaction_date: '12-22-2020', 
      merchant_name: 'KFC', 
      category: 'Other', 
      account_name: 'Plaid Checking'
    }
  ])
  


      // axios.post('/database/getaccounts', {user_id: user.user_id})
      // .then(res => {
      //   console.log("ACCCOUNTS IN FRONTEND>>>>>", res)
      //   setAccounts(res.data)
      //   console.log(accounts)
      // })
  }, [user])

return (
    <div>
      <myContext.Provider value={{user, accounts, transactions, currentAccount, setUser, setAccounts, setTransactions, setCurrentAccount}}>
        <Router> 
          <Switch>
            {/* <Route path="/" exact component = {SignIn} />
            <Route path="/signup" exact component = {Signup} /> */}
            {/* <Route path="/landing" component = {Landing} /> */}
            <Route path="/" component = {Landing} />
          </Switch>
        </Router> 
      </myContext.Provider>
    </div>
    )
};

export default App;
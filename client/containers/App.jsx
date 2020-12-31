import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, } from "react-router-dom";
import Landing from './Landing.jsx';
import SignIn from './SignIn.jsx';
import Signup from './Signup.jsx';
import myContext, { holder } from '../contexts/GlobalContext.jsx'

const App = () => {

  //Declare all state variables inside App
  const [user, setUser] = useState({});
  const [accounts, setAccounts] = useState([]); 
  const [transactions, setTransactions] = useState([]); 
  const [currentAccount, setCurrentAccount] = useState({});

  //fetch user, accounts and transactions for the first account and update state here 
  useEffect(() => {
      // fetch('/test/get_user')
      // .then(res => res.json())
      // .then(res => {
      //   
    // PARSE USER OBJECT AND FEED IT TO SET USER
    setUser({first_name: 'evan', last_name: 'perlman', email: 'eperlman@gmail.com'});
      //   });
      // }).catch(err => {
      //   if (err) return err

      // fetch('/test/get_accounts')
      // .then(res => res.json())
      // .then(res => {
      //   
    // PARS ACCOUNTS ARRAY AND FEED IT TO FEED TO ACCOUNTS LIST
    setAccounts([{account_name: 'Plaid Checking', account_id: 'enwfn383n48g6'}])

      //   });
      // }).catch(err => {
      //   if (err) return err
    setCurrentAccount({
      account_id: 'yBDqZZbGZ5HX7GBrw654cpDGKWlP4ztyw43j8',
      account_subtype: 'Checking',
      account_name: 'Plaid TEST',
      acount_balance: 100
    })

    setTransactions([{
      id: 1,
      transaction_amount: 500, 
      transaction_date: '12-22-2020', 
      merchant_name: 'KFC', 
      category: 'Food', 
      account_name: 'Plaid Checking'
    }])
    
  }, [])

return (
    <div>
      <myContext.Provider value={{user, accounts, transactions, currentAccount, setUser, setAccounts, setTransactions, setCurrentAccount}}>
        <Router> 
          <Switch>
            <Route path="/" exact component = {SignIn} />
            <Route path="/signup" exact component = {Signup} />
            <Route path="/landing" component = {Landing} />
          </Switch>
        </Router> 
      </myContext.Provider>
    </div>
    )
};

export default App;
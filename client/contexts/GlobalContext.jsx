import React, {createContext, useState, useContext} from 'react'; 

// const [loggedIn, setLogin] = useState(false);

const myContext = React.createContext({
  user: {},
  accounts: [],
  transactions: [],
  currentAccount: {},
  setUser: () => {},
  setAccounts: () => {}, 
  setTransactions: () => {}
});

// const myContext = React.createContext(null);

export default myContext; 
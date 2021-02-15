import React, { useState, useEffect, useContext } from 'react';
import myContext from '..//contexts/GlobalContext.jsx'



function AccountInfo (props) {

  const {currentAccount} = useContext(myContext); 


  return (
    <div className = "accInfo">
      <h3>Account Information</h3>
      <p><strong>Name: </strong>{currentAccount.account_name}</p>
      <p><strong>Type: </strong>{currentAccount.account_subtype}</p>
      <p><strong>Balance: </strong>${currentAccount.account_balance}</p>
   </div>
  )
}


export default AccountInfo;
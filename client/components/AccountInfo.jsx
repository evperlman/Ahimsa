import React, { useState, useEffect } from 'react';

// make all left adjusted and conditional upon the NavBar Button Selector. 


function AccountInfo (props) {
  return (
    <div className = "accInfo">
      <h3>Account Information</h3>
      <p><strong>Name: </strong>{props.accounts[0].account_name}</p>
      <p><strong>Type: </strong>{props.accounts[0].account_subtype}</p>
      <p><strong>Balance: </strong>${props.accounts[0].acount_balance}</p>
   </div>
  )
}


export default AccountInfo;
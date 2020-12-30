import React, { useCallback, useEffect, useState } from 'react';
import AccountList from './AccountList.jsx'
import Button from '@material-ui/core/Button';
import PlaidButton from './PlaidButton.jsx'


const NavBar = (props) => {

      return (
        <div>
          <div>
            <p>Michael Scott</p>
            <p>Email Address</p>
            <p>Date</p>
          </div>
          <div>email address</div>
        
          <div className = "navbar">
            {/* {once we link the accounts the accounts render here.} */}
            <AccountList accounts={props.accounts} onChange={props.onChange}/>
            <PlaidButton />
          </div>
        </div>
      );
};

export default NavBar;
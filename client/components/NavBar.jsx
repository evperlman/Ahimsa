import React, { useCallback, useEffect, useState, useContext } from 'react';
import AccountList from './AccountList.jsx'
import Button from '@material-ui/core/Button';
import PlaidButton from './PlaidButton.jsx'
import myContext from '../contexts/GlobalContext.jsx'

const NavBar = (props) => {
  const {user} = useContext(myContext); 

  const today = new Date().toJSON().slice(0,10).replace(/-/g,'/'); 

      return (
          <div>
            <div>
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
              <p>{user.email}</p>
              <p>{today}</p>
            </div>
            <div className = "navbar">
              {/* {once we link the accounts the accounts render here.} */}
              <PlaidButton />
              <AccountList />
              
            </div>
          </div>      
      );
};

export default NavBar;

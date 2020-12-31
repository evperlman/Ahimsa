import React, { useCallback, useEffect, useState, useContext } from 'react'; 
import { usePlaidLink } from 'react-plaid-link'; 
import myContext from '../contexts/GlobalContext.jsx'
import axios from 'axios'

function PlaidButton() {
  const {user, accounts, setAccounts} = useContext(myContext); 

  const [linkToken, setLinkToken] = useState(''); 
  
  //Load the link token immediately when page renders and store in state
  useEffect(() => {
    const token = fetch('/test/get_link_token',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(response => response.json())
    .then(data => {
      setLinkToken(data); 
    })
  }, [])

  
  const onSuccess = useCallback((public_token, metadata) => { 
    fetch('/test/get_access_token', {
      method: 'POST',
      body: JSON.stringify({
        public_token: public_token,
        accounts: metadata.accounts,
        institution: metadata.institution,
        link_session_id: metadata.link_session_id,
        user_id: user.user_id,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(res => {
      axios.post('/database/getaccounts', {user_id: user.user_id })
      .then(res => {
        setAccounts(res.data)
        console.log("Accounts>>>",res.data)
      })
    })
    
  }, []);
  
  //Set up config to pass into usePlaidLink
  const config = {
    token: linkToken, 
    onSuccess: onSuccess
  }

  const {open, ready, error } = usePlaidLink(config); 


return (
  <button className="linkButton" onClick={() => open()} disabled={!ready}>Link Account</button>
)
}
export default PlaidButton;
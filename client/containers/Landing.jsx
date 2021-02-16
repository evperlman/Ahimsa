import React from 'react'; 
import AccountInfo from '../components/AccountInfo.jsx';
import NavBar from '../components/NavBar.jsx';
import DisplayData from '../components/DisplayData.jsx';
import Transactions from '../components/Transactions.jsx';
import '../styles.scss';


function Landing () {
  
  return (
  <div className ="landing">
      <div className = "leftSide">
        <NavBar /> 
      </div>
      <div className = "rightSide">
        <AccountInfo />
        <DisplayData />
        <Transactions /> 
      </div>
  </div>
  )
}


export default Landing;
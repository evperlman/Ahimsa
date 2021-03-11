import React, { useState, useEffect, useContext } from 'react'; 
import Transaction from './Transaction.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';
import { DataGrid } from '@material-ui/data-grid';
import { element } from 'prop-types';
import myContext from '../contexts/GlobalContext.jsx';


const columns = [
  { field: 'merchant_name', headerName: 'Transaction', width: 175 },
  { field: 'category', headerName: 'Category', width: 175 },
  { field: 'transaction_date', headerName: 'Date', width: 175 },
  { field: 'transaction_amount', headerName: 'Amount', width: 175 },
  { field: 'account_name', headerName: 'Account Type', width: 175 }
];


export default function Transactions() {

  const { transactions } = useContext(myContext); 
  
  //make the fetch request to get transactions based on the currentAccount state vairable

  return (
    <div className="transactions">
      <h3>Transactions</h3>
      <div className ="table" style={{ height: 800, width: '90%' }}>
        <DataGrid rows={transactions.map(transaction => {
          transaction.id = Math.ceil(Math.random()*100)
          return transaction
        })} columns={columns} pageSize={50}/>
      </div>
    </div>
  );
}


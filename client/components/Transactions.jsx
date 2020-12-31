import React, { useState, useEffect, useContext } from 'react'; 
import Transaction from './Transaction.jsx';
import ScrollToBottom from 'react-scroll-to-bottom';
import { DataGrid } from '@material-ui/data-grid';
import { element } from 'prop-types';
import myContext from '../contexts/GlobalContext.jsx';


const columns = [
  { field: 'merchant_name', headerName: 'Transaction', width: 150 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'transaction_date', headerName: 'Date', width: 130 },
  { field: 'transaction_amount', headerName: 'Amount', type: 'number', width: 130 },
  { field: 'account_name', headerName: 'Account Type', width: 150 }
];


export default function Transactions() {
  // const [transactions, setTransactions] = useState([]); 
  const { transactions, setTransactions } = useContext(myContext); 
  console.log('transactions: ', transactions); 
  //make the fetch request to get transactions based on the currentAccount state vairable
  useEffect(() => {
    // fetch('/test/get_transactions')
    //   .then(res => res.json())
    //   .then(res => setTransactions(res.transactions.map((ele) => {
    //     return {
    //       id: ele.row_id,
    //       account_id: ele.account_id,
    //       merchant_name: ele.merchant_name,
    //       amount: ele.amount,
    //       account_type: ele.account_type,
    //       date_of_transaction: ele.date_of_transaction,
    //       category: ele.category
    //     }
    //   }))) 
  }, [])

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


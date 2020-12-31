import { BarSeries } from '@devexpress/dx-react-chart';
import React, { useState, useEffect, useContext } from 'react'; 
import { Doughnut } from 'react-chartjs-2';
import myContext from '../contexts/GlobalContext.jsx'
const DisplayData = () => {
let { transactions, currentAccount } = useContext(myContext);
// console.log('TRANSACTIONS IN DISPLAYDATA', transactions); 
// console.log('CURRENT ACCOUNT IN DISPLAYDATA', currentAccount); 
// let spendData = {}
let foodTotal = 0;
let travelTotal = 0;
let recTotal = 0;
for (let i = 0; i < transactions.length; i++){
  if(transactions[i].category === 'Food and Drink') foodTotal += transactions[i].transaction_amount;
  if(transactions[i].category === 'Travel') travelTotal += transactions[i].transaction_amount;
  if(transactions[i].category === 'Recreation') recTotal += transactions[i].transaction_amount;
}
  const data = {
    labels: ['Food and Drink', 'Travel', 'Recreation'],
    datasets: [
      {
        label: 'Spend By Category',
        data: [foodTotal, travelTotal, recTotal],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className="dataContainer">
    <div className ="displayData">
      <Doughnut 
      data={data}
      responsive={true}
      options={{ maintainAspectRatio: false }}      
      />
    </div>  
  </div>
  )
};
export default DisplayData;
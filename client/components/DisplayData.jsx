import React, { useState, useEffect, useContext } from 'react'; 
import { Doughnut, Bar } from 'react-chartjs-2';
import myContext from '../contexts/GlobalContext.jsx'
import AccountInfo from './AccountInfo.jsx';

const DisplayData = () => {
let { transactions, currentAccount } = useContext(myContext);

let spendData = {}

for (let i = 0; i < transactions.length; i++){

  console.log('transaction amount: ', transactions[i].transaction_amount)

  if(!spendData[transactions[i].category]){
    spendData[transactions[i].category] = transactions[i].transaction_amount; 
  } else {
    spendData[transactions[i].category] += transactions[i].transaction_amount; 
  }
}

  console.log('labels:', Object.keys(spendData));
  console.log('values:', Object.values(spendData)); 

  const data = {
    labels: Object.keys(spendData),
    datasets: [
      {
        label: 'Spend By Category',
        data: Object.values(spendData),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
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
      <AccountInfo />
      <div className="chart">
        <Doughnut 
        data={data}
        responsive={true}
        options={
          { maintainAspectRatio: false },
          {legend: {
            position: 'right'
          }}
        }
             
        />
      </div> 
      <div className="chart">
        <Bar 
        data={data}
        />
      </div>
  </div>
  )
};
export default DisplayData;
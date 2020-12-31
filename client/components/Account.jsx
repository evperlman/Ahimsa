import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';


export default function Account(props) {
  
  const handleClick = (e) => {
    e.preventDefault()
    console.log('account_id', props.account_id); 
  }
  
  return (
    <div>
        <Button onClick={handleClick}>{props.account_name}</Button> 
    </div>
  )
}
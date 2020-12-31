import React, { useState, useEffect, useContext } from "react";
import Button from "@material-ui/core/Button";
import myContext from "../contexts/GlobalContext.jsx";
import axios from "axios";

export default function Account(props) {
  const { setCurrentAccount } = useContext(myContext);
  const { setTransactions } = useContext(myContext);

  const handleClick = (e) => {
    e.preventDefault();
    console.log("account_id", props.account_data.account_id);

    setCurrentAccount({
      account_id: props.account_data.account_id,
      account_subtype: props.account_data.account_subtype,
      account_name: props.account_data.account_name,
      account_balance: props.account_data.account_balance,
    });

    axios(`database/gettransactions/${props.account_data.account_id}`).then(
      (result) => {
        setTransactions(result.data);
      }
    );

    // fetch(`datbase/gettransactions/${props.account_data.account_id}`).then(data => data.json()).then(result => {
    // })
    // setTransactions({})
  };

  return (
    <div>
      <Button onClick={handleClick}>{props.account_data.account_name}</Button>
    </div>
  );
}

import React, { useState, useEffect, useContext } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import myContext from '../contexts/GlobalContext.jsx'

// make accounts conditionally render. currently hard coded. 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));



function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

function AccountList(props) {
  const classes = useStyles();
  // let listItems = <div>test</div>;
  let listItems = []; 

  const { accounts } =  useContext(myContext); 

  // useEffect to fetch accountList from Plaid and then update state
  useEffect(() => {
    // fetch('/test/get_accounts')
    // .then(res => res.json())
    // .then(res => {
    //   setAccounts(res); 
    //   listItems = fakeAccounts.map((account, i) => {
    //     <ListItem button>
    //       <ListItemText primary={account} />
    //     </ListItem>
    //   });
    // }).catch(err => {
    //   if (err) return err

    // setAccounts(accounts[0].account_name);
    }, []);
  // });

  const createList = () => {
    for (let i = 0; i < accounts.length; i++){
      listItems.push(
      <div>
      <ListItem button key={i}> 
        <ListItemText primary={accounts[i].account_name} _account_id={accounts[i].account_id} /> 
      </ListItem>
        <Divider />
      </div>
      )
    }
  };

  createList(); 

  // iterate through fetch request of accounts and popoulate array here. 
  return (
    <div className={classes.root}>
      <List component="nav">
        {/* render all accounts from state */}
        {listItems}        
        </List>
    </div>
  );
}

export default AccountList;

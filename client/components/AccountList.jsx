import React, { useState, useEffect, useContext } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import myContext from '../contexts/GlobalContext.jsx'
import Button from '@material-ui/core/Button';
import Account from './Account.jsx'

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

  const createList = () => {
    useEffect(() => {
      console.log(accounts)
    }, [accounts])

    for (let i = 0; i < accounts.length; i++){
      listItems.push(
      <div>
        <ListItem key={i}> 
          <Account account_id={accounts[i].account_id} account_data={accounts[i]}/>
        </ListItem>
          <Divider />
      </div>
      )
    };
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

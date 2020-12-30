import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

// make accounts conditionally render. currently hard coded. 

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

// function ListItemLink(props) {
//   return <ListItem button component="a" {...props} />;
// }

function AccountList(props) {
  const classes = useStyles();

  // const [accounts, addAccount] = useState([]); 

  //useEffect to fetch accountList from Plaid and then update state

  // iterate through fetch request of accounts and popoulate array here. 
  return (
    <div className={classes.root}>
      <List component="nav">
        {/* render all accounts from state */}
        <ListItem button>
          {/* {accounts.map((account, i) =>  /> )} */}
          <ListItemText primary="Plaid Gold Standard Checking" />
        </ListItem>
      <Divider />
      </List>
    </div>
  );
}

export default AccountList;
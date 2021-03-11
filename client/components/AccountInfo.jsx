import React, { useState, useEffect, useContext } from 'react';
import myContext from '..//contexts/GlobalContext.jsx'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


function AccountInfo (props) {

  const {currentAccount} = useContext(myContext); 

  const useStyles = makeStyles({
    root: {
      minWidth: 200,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h6" component="h2">
            {currentAccount.account_name}
          </Typography>
          <Typography color="textSecondary">
          Type: {currentAccount.account_subtype}
          </Typography>
          <Typography color="textSecondary">
          Balance: ${currentAccount.account_balance}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

  
export default AccountInfo;
import React, { useCallback, useEffect, useState, useContext } from 'react';
import AccountList from './AccountList.jsx'
import PlaidButton from './PlaidButton.jsx'
import myContext from '../contexts/GlobalContext.jsx'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    minWidth: '100%',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const NavBar = (props) => {
  const {user} = useContext(myContext); 
  console.log(user)

  const today = new Date().toJSON().slice(0,10).replace(/-/g,'/'); 

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
      return (
          <div>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" component="p">
                  {today}
                </Typography>
              </CardContent>
              <Divider />
              <PlaidButton />
              <Divider />
              <AccountList />
            </Card>
          </div>     
      );
};

export default NavBar;

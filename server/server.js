const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

//routers
//apiRouter is connected to the SQL database. Performs operations for bank transactions on the database.
 const dbRouter = require('./routes/db.js');
//plaidRouter connects to the Plaid API and verifies the user's bank information and allows us access to make API requests for bank transactions
 const plaidRouter = require('./routes/plaid.js');
//bcryptRouter encrypts, stores and checks passwords connected to a separate SQL table on the database. 
const bcryptRouter = require('./routes/bcrypt.js');
const { nextSortDirection } = require('@material-ui/data-grid');

// body parsers
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((req,res) => {
  // console.log("IN>>>>",req)
  console.log('hi')
  res.send("hello")
})

// route handlers
app.use('/database', dbRouter);
app.use('/test', plaidRouter); // Name convention for this route might be /auth
app.use('/bcrypt', bcryptRouter);


// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));

// serve index.html on the route '/'
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.use((req, res) => {
  console.log("OUT>>>>>", res)
  return res.send('hi 2')
})


app.listen(3000, () => {
  console.log(`Server listening on port: 3000`);
});

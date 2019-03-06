require('dotenv').config();

const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Initializations
const { mongoose } = require('./database');
const app = express();

// Settings 
app.set('port', process.env.PORT);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/users', require('./routes/users.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start Servert
app.listen(app.get('port'), () =>{
    console.log('Server on port: ' + app.get('port'))
});
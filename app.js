const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const dotenv=require('dotenv');
const myenv=dotenv.config();
const PORT = process.env.PORT || 3000;
const session = require('express-session');

app.set('view engine','hbs');

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))   
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth1'));
app.use('/auth2',require('./routes/auth2'));

  
app.listen(PORT, ()=>{
    console.log(`Connected in ${PORT} port`);
})

  
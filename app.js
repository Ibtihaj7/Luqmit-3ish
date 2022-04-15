const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const dotenv=require('dotenv');
const myenv=dotenv.config();
const PORT = process.env.PORT || 3000;

app.set('view engine','hbs');

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false }));

app.listen(3001, ()=>{
    console.log("Connected in 3001 port");
})

 let databaseConnection = mysql.createConnection({
   host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
   
})
databaseConnection.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('connected');
    }
})
if (myenv.error) {
    throw myenv.error
  }
  
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const dotenv=require('dotenv');
const myenv=dotenv.config();

const PORT = process.env.PORT || 3000; 
const session = require('express-session');
/*
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
    console.log("Error while connecting the database")
    throw myenv.error
}
*/

 
const publicDirectory = path.join(__dirname,'public');

app.use(express.urlencoded({extended:false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))  


app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth1'));
app.use('/auth2',require('./routes/auth2'));
app.use('/',require('./routes/verifications'));
app.use("/",require("./routes/contactUs"))   
app.set("view engine", "hbs")
app.use(express.static(publicDirectory));
 
app.listen(PORT, ()=>{
    console.log(`Connected in ${PORT} port`);
})

//exports.db = databaseConnection;



const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const dotenv=require('dotenv');
const myenv=dotenv.config();
const PORT = process.env.PORT || 3001; 
const session = require('express-session');

app.use(express.json());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
const publicDirectory = path.join(__dirname,'public');
app.set("view engine", "hbs")
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))  

app.use('/',require('./routes/pages'));
app.use('/auth1',require('./routes/auth1'));
app.use('/auth2',require('./routes/auth2'));
app.use('/auth3',require('./routes/changepassword'));
app.use("/",require("./routes/contactUs"))
app.use('/',require('./routes/verifications'));
app.use('/meal',require('./routes/meals'))
app.set("view engine", "hbs")
app.use(express.static(publicDirectory));

app.listen(PORT, ()=>{
    console.log(`Connected in ${PORT} port`);
})

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();
const dotenv=require('dotenv');
const myenv=dotenv.config();
const PORT = process.env.PORT ||3000
const session = require('express-session');

app.use(express.json());
app.use(session({ 
    secret: '123456catr',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000000 }
}))
 
const publicDirectory = path.join(__dirname,'public');
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false }));


app.use('/',require('./routes/pages'));
app.use('/profile',require('./routes/profile'));
app.post('/edit',(req,res)=>{res.render('EditProfilePage');})
app.use('/auth1',require('./routes/auth1'));
app.use('/auth2',require('./routes/auth2'));
app.use('/change',require('./routes/changepassword'));
app.use('/deleteacount',require('./routes/deleteAcount'));
app.use("/",require("./routes/contactUs"))
app.use('/',require('./routes/verifications'));
app.use('/meal',require('./routes/meals'))
app.use('/res',require('./routes/meals'))
app.use('/viewRes',require('./routes/viewRes'));
app.post('/endSession',(req,res) => { res.redirect('/Login')})

app.use(express.static(publicDirectory));

app.listen(PORT, ()=>{
    console.log(`Connected in ${PORT} port`);
})

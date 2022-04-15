const express = require('express');
const path = require('path');
const mysql = require('mysql');
const app = express();

app.set('view engine','hbs');

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({extended:false }));

app.listen(3001, ()=>{
    console.log("Connected in 3001 port");
})
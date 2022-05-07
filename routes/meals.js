const express = require('express');
const router = express.Router();

const mysql = require("mysql");
const app = express();
const db = require("../config/db") 

app.set("view engine", "ejs");
app.use(express.static("public"));

router.post('/meals',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    if(dicription && quantity)
    db.query('INSERT INTO menu SET ?',{category:'وجبات رئيسية',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })  
    const dicription2 = req.body.discription1;
    const quantity2 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:dicription1,quantity:quantity2,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })
    const dicription3 = req.body.discription1;
    const quantity3 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:dicription3,quantity:quantity3,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })
    const dicription4 = req.body.discription1;
    const quantity4 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:dicription4,quantity:quantity4,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })  
    const dicription5 = req.body.discription1;
    const quantity5 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:dicription5,quantity:quantity5,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    }) 
    const dicription6 = req.body.discription1;
    const quantity6 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'وجبات سريعة',discription:dicription6,quantity:quantity6,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            
            res.render('resHomePage')
        }
    })
    console.log('insert succesfuly');
});

module.exports = router;
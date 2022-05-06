const express = require('express');
const router = express.Router();

const mysql = require("mysql");
const app = express();
const db = require("../config/db") 

app.set("view engine", "hbs");
app.use(express.static("public"));

router.post('/m1',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'وجبات رئيسية',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })  
    
});
router.post('/m2',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })
});
router.post('/m3',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })
});
router.post('/m4',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })  
});
router.post('/m5',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    }) 
});
router.post('/m6',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'وجبات سريعة',discription:dicription,quantity:quantity,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })
});

module.exports = router;
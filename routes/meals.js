const express = require('express');
const router = express.Router();

const mysql = require("mysql");
const app = express();
const db = require("../config/db") 

app.set("view engine", "ejs");
app.use(express.static("public"));

router.post('/m1',(req,res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    if(dicription && quantity)
    db.query('UPDATE menu SET quantity =? WHERE account_id=?',[quantity,req.session.userId],(error,results) => {
        if(error){
            throw error;
        }else{
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage',{
                    resdata:results
                })
            })
            
        }
    })  
})
router.post('/m2',(req,res) => {
    const dicription2 = req.body.discription1;
    const quantity2 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:dicription1,quantity:quantity2,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })
})
router.post('/m3',(req,res) => {
    const dicription3 = req.body.discription1;
    const quantity3 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:dicription3,quantity:quantity3,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })
})
router.post('/m4',(req,res) => {
    const dicription4 = req.body.discription1;
    const quantity4 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:dicription4,quantity:quantity4,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    })  
})
router.post('/m5',(req,res) => {
    const dicription5 = req.body.discription1;
    const quantity5 = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:dicription5,quantity:quantity5,account_id:req.session.userId },(error,results) => {
        if(error){
            throw error;
        }else{
            res.render('resHomePage')
        }
    }) 
})
router.post('/m6',(req,res) => {
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
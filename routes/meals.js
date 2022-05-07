const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const app = express();
const db = require("../config/db") 

app.set("view engine", "ejs");
app.use(express.static("public"));

router.post('/m1',(req,res) => {
    const quantity = req.body.quantity1;
    const discription = req.body.discription1;
    if(quantity){
        console.log(req.session.userId);
    db.query('UPDATE menu SET quantity =?,discription=? WHERE category=?',[quantity,discription,'وجبات رئيسية'],(error,results) => {
        if(error){
            throw error;
        }else{
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage')
            })
        }
    })  
}
})
router.post('/m2',(req,res) => {
    const quantity = req.body.quantity2;
    const discription = req.body.discription2;
    if(quantity){
        console.log(req.session.userId);
    db.query('UPDATE menu SET quantity =?,discription=? WHERE category=?',[quantity,discription,'ساندويشات'],(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('dd');
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage')
            })
        }
    })  
}
})
router.post('/m3',(req,res) => {
    const quantity = req.body.quantity3;
    const discription = req.body.discription3;
    if(quantity){
    db.query('UPDATE menu SET quantity =?,discription=? WHERE category=?',[quantity,discription,'عصائر'],(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('dd');
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage')
            })
        }
    })  
}
})
router.post('/m4',(req,res) => {
    const quantity = req.body.quantity4;
    const discription = req.body.discription4;
    if(quantity){
    db.query('UPDATE menu SET quantity =?,discription=? WHERE category=?',[quantity,discription,'حلويات'],(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('dd');
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage')
            })
        }
    })  
}
})
router.post('/m5',(req,res) => {
    const quantity = req.body.quantity5;
    const discription = req.body.discription5;
    if(quantity){
        console.log(req.session.userId);
    db.query('UPDATE menu SET quantity =?,discription=? WHERE category=?',[quantity,discription,'شوربات'],(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('dd');
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage')
            })
        }
    })  
}
})
router.post('/m6',(req,res) => {
    const quantity = req.body.quantity6;
    const discription = req.body.discription6;
    if(quantity){
        console.log(req.session.userId);
    db.query('UPDATE menu SET quantity =?,discription=? WHERE category=?',[quantity,discription,'وجبات سريعة'],(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('dd');
            db.query("SELECT * FROM menu WHERE account_id = ? ", [req.session.userId], (error, results) => {
                res.render('resHomePage')
            })
        }
    })  
}
})

module.exports = router;
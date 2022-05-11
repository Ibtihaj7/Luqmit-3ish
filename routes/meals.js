const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const app = express();
const db = require("../config/db") 

app.set("view engine", "ejs");
app.use(express.static("public"));

router.post('/m1',(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity1;
    const discription = req.body.discription1;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=? AND account_id=?',[quantity,'وجبات رئيسية',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=? AND account_id=?',[discription,'وجبات رئيسية',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})
router.post('/m2',(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity2;
    const discription = req.body.discription2;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=? AND account_id=?',[quantity,'ساندويشات',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=? AND account_id=?',[discription,'ساندويشات',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})
router.post('/m3',(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity3;
    const discription = req.body.discription3;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=? AND account_id=?',[quantity,'عصائر',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=? AND account_id=?',[discription,'عصائر',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})
router.post('/m4',(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity4;
    const discription = req.body.discription4;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=? AND account_id=?',[quantity,'حلويات',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=? AND account_id=?',[discription,'حلويات',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})
router.post('/m5',(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity5;
    const discription = req.body.discription5;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=? AND account_id=?',[quantity,'شوربات',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=? AND account_id=?',[discription,'شوربات',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})
router.post('/m6',(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity6;
    const discription = req.body.discription6;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=? AND account_id=?',[quantity,'وجبات سريعة',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=? AND account_id=?',[discription,'وجبات سريعة',req.session.userId],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})


router.delete('/delete_order/:id',(req,res) => {    
     db.query('DELETE FROM orders WHERE id =?',[req.params.id],(error,results) => {
         if(error){
             throw error;
         }
     }) 
    res.redirect('/restaurant')
})

module.exports = router;
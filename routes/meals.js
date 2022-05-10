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
            db.query('UPDATE menu SET quantity =? WHERE category=?',[quantity,'وجبات رئيسية'],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=?',[discription,'وجبات رئيسية'],(error,results) => {
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
            db.query('UPDATE menu SET quantity =? WHERE category=?',[quantity,'ساندويشات'],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=?',[discription,'ساندويشات'],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})
router.post('/m3',(req,res) => {
    console.log('nnn');
    if(!req.session.userId) return res.redirect('/endSeccion')
    const quantity = req.body.quantity3;
    const discription = req.body.discription3;
    if(quantity || discription){  
        if(quantity){    
            db.query('UPDATE menu SET quantity =? WHERE category=?',[quantity,'عصائر'],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=?',[discription,'عصائر'],(error,results) => {
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
            db.query('UPDATE menu SET quantity =? WHERE category=?',[quantity,'حلويات'],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=?',[discription,'حلويات'],(error,results) => {
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
            db.query('UPDATE menu SET quantity =? WHERE category=?',[quantity,'شوربات'],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=?',[discription,'شوربات'],(error,results) => {
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
            db.query('UPDATE menu SET quantity =? WHERE category=?',[quantity,'وجبات سريعة'],(error,results) => {
                if(error){
                    throw error;
                }
            })  
        }
        if(discription){
            db.query('UPDATE menu SET discription=? WHERE category=?',[discription,'وجبات سريعة'],(error,results) => {
                if(error){
                    throw error;
                }
            }) 
        }
    }
    return res.redirect('/restaurant');
})


router.delete('/delete_order',(req,res) => {
    // db.query('DELETE FROM orders WHERE id =?',(error,results) => {
    //     if(error){
    //         throw error;
    //     }
    // }) 
    res.redirect('/restaurant')
})

module.exports = router;
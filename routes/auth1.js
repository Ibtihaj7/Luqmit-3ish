const express = require('express');
const path = require('path')
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../config/db") ;
const app = express();
const verificationEmail = require("../config/emailVerification");

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

router.post('/signUp',(req,res) => {
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const type = req.body.type;
    db.query('SELECT email FROM account WHERE email = ?',[email],async(error,results) => {
        if(error){
            throw error;
        }
        if(results.length  > 0 ){
            return res.render('signUp',{
                message:"the email is already used"
            });
        }else{
        let hashedPassword = await bcrypt.hash(password , 8);
        db.query('INSERT INTO account SET ?',{name:name,email:email,phone:phone,password:hashedPassword,type:type},(err,result) => {
            if(err){
                throw err;
            }
            else{
                db.query('SELECT * FROM account WHERE email= ?',[email],(err,res) => {
                    console.log(res);
                    db.query('INSERT INTO menu SET ?',{category:'وجبات رئيسية',discription:'  ',quantity:0,account_id:res[0].id},(err,res) => {
                        if(err)throw err     
                })
                db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:'  ',quantity:0,account_id:res[0].id},(err,res) => {
                    if(err)throw err     
                })
                db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:'  ',quantity:0,account_id:res[0].id},(err,res) => {
                    if(err)throw err     
                })
                db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:'  ',quantity:0,account_id:res[0].id},(err,res) => {
                   if(err)throw err     
                })
                db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:'  ',quantity:0,account_id:res[0].id},(err,res) => {
                    if(err)throw err     
                })
                db.query('INSERT INTO menu SET ?',{category:'وجبات سريعة',discription:'  ',quantity:0,account_id:res[0].id},(err,res) => {
                    if(err)throw err     
                })
                })
            }

                
        
        });
        } 
        })
        verificationEmail.sendVerEmail(email);
        res.render('logIn');

});
module.exports = router;
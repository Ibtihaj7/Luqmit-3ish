const express = require('express');
const path = require('path')
const router = express.Router();
const cryptr = require('../config/cryptr');
const bcrypt = require('bcryptjs');
const db = require("../config/db") ;
const app = express();
const verificationEmail = require("../config/emailVerification");

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));

router.post('/signUp',(req,res) => {
   
    const Info = `${req.body.name}|${req.body.email}|${req.body.phone}|${req.body.password}|${req.body.type}`
    const hashedInfo = cryptr.encrypt(Info);
    db.query('SELECT email FROM account WHERE email = ?',[req.body.email],async(error,results) => {
        if(error){
            throw error;
        }
        if(results.length  > 0 ){
            return res.render('signUp',{
                message:"the email is already used"
            });
        }else{
         verificationEmail.sendVerEmail(req.body.email,hashedInfo);
        res.redirect('/Login');
        } 
    })  
});
module.exports = router;
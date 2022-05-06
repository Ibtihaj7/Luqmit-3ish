const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../config/db") ;
const app = express();
const verificationEmail = require("../config/emailVerification");
 
app.set('view engine','hbs');
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
        db.query('INSERT INTO account SET ?',{name:name,email:email,phone:phone,password:hashedPassword,type:type},(err,results) => {
            if(err){
                throw err;
            }else{
                verificationEmail.sendVerEmail(email);
                res.render('logIn');
            }
        });
    }
    });
});
module.exports = router;
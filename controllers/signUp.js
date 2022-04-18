const mysql=require('mysql');
const bcrypt = require('bcryptjs');
const express=require('express');

const app=express();
const nodemailer=require('nodemailer');

const regeEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
let db = mysql.createConnection({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
   
})
app.set('view engine','hbs');
app.use(express.static('public'));

exports.register = (req,res) => {
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const password=req.body.password;
    const confirm=req.body.confirm;
    // const type = req.bode.type;

    db.query('SELECT email FROM account1 WHERE email = ?',[email],async(error,results) => {
        if(error){
            throw error;
        }
        if(results.length  > 0 ){
            return res.render('signUp',{
                message:"the email is already used"
            });
        }else if(password!== confirm){
            return res.render('signUp',{
                message:"Password and comfirm password do not match"
            });
        }else if(name===""||email===""||phone==="" ||password===""){
            return res.render('signUp',{
                message:"you muast fill all the featuer"
            });
        }else if(!(regeEmail.test(email))){
            return res.render('signUp',{
                message:"Please enter a valid email address"
            });            
        }else if(!(regePassword.test(password))){
            return res.render('signUp',{
                message:"Please enter a valid password, must include both lower and upper case charachter, at least one number or symbol,and at least 8 characters long"
            });
        }else{
        let hashedPassword = await bcrypt.hash(password , 8);
        db.query('INSERT INTO account1 SET ?',{name:name,email:email,phone:phone,password:hashedPassword},(err,results) => {
            if(err){
                throw err;
            }
        });
        res.render('mainPage')
    }
    });
   
}
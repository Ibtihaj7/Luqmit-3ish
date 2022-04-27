const router = express.Router();
const bcrypt = require("bcrypt");
const express = require("express");
const mysql=require('mysql');
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;

let db = mysql.createConnection({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
   
})

databaseConnection.connect((err)=>{
    if(err){
        throw err;
    }else{
        console.log('connected');
    }
})

router.post('/changePassword/',(req,res) => {

id = req.session.id
let {curentPassword,newPassword,confirmPassword}=req.body;

db.query("SELECT* FROM USERS WHERE id=? AND password=?",[id,password],async(error,result) => {
    if(password!==curentPassword){
        return res.render('changePassword',{
           message:"Enter your account password correctly"
        });
    }
    else if(newPassword!==confirmPassword){
        return res.render('changePassword',{
            message:"Password does not match with confirm Password"
        })
    }
    else if(!(regePassword.test(newPassword))){
        return res.render('changePassword',{
            message:"Please enter a valid password, must include both lower and upper case charachter, at least one number or symbol,and at least 8 characters long"
        });
    }
    else {
        let hashedPassword = await bcrypt.hash(password , 8);
        db.query("UPDATE account SET password = ? WHERE id = ?", [newPassword,id],(error)=>{
            if(error){     
                console.log("Error when resetting password")     
            }else{
                res.render("home",{ message: "Password changed successfully"})
            }
        })
       
    }
    
});
})

module.exports=router;



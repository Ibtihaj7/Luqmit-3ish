const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql=require('mysql');
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
const db = require("../config/db") 



router.post('/changePassword',(req,res) => {

id = req.session.id
console.log(id)
let {curentPassword,newPassword,confirmPassword}=req.body;

db.query("SELECT* FROM account WHERE id=? AND password=?",[id,curentPassword],async(error,results) => {
    
    if(error){
        return error
    }
    if(results[0].password!==curentPassword){
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
        let hashedPassword = await bcrypt.hash(newPassword,8);
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






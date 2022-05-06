const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql=require('mysql');
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
const db = require("../config/db") 

router.post('/changePassword',(req,res) => {

id = req.session.userId
console.log(id)

let curentPassword=req.body.curentPassword;
let newPassword = req.body.newPassword;
let confirmPassword = req.body.confirmPassword;

db.query("SELECT* FROM account WHERE id=? ",[id],async(error,results) => {
    
    console.log(results)
    if(error){
        console.log('error');
        return error
    }
    console.log(curentPassword);
    console.log(results[0].password);
    
    if (!(results.length  && bcrypt.compareSync(curentPassword,results[0].password))){
    
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
      
        let hashedPassword = await bcrypt.hash(newPassword , 8);
        db.query("UPDATE account SET password = ? WHERE id = ?", [hashedPassword,id],(error)=>{
            if(error){     
                console.log("Error when resetting password")     
            }else{
                if(results[0].type=="resturent")
                res.render("resHomePage",{ message: "Password changed successfully"})
                else{
                    res.render("charHomePage",{ message: "Password changed successfully"})
                    
                }
            }
        })    
    }
});
})

module.exports=router;
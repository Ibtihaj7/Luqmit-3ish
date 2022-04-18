const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")  

    
//Reset Password 
passEmail = require('../config/passwordRequest')  
    
router.post("/newPasswordReq", (req, res)=>{
    let {email} = req.body  
    console.log(req.body)
    db.query("SELECT EMAIL FROM USERS_DB.USER_INFO WHERE EMAIL = ?", [email], async(error, result)=>{
        if(error){
            console.log("Error while chicking if the user exists in the DB")  
            res.render("newPassword", {message: "Something went wrong please try again"})
        }else{
            if(result.length > 0){      
                passEmail.sendVerEmail(email)
                res.render("newPassword", {message: "Please check your email to be able to reset your password"})
            }else{
                res.render("newPassword", {message: "Please enter a valid email"})   
                console.log(result)         
            }
        }
    }) 
})


router.get("/resetRequest/:email/:uniqueString", (req, res)=>{
    let {email, uniqueString} = req.params 
    db.query("SELECT uniqueString FROM emailver WHERE email= ?", [email], async (error, result)=>{
        if(result.length > 0){
            let compResult  
            console.log(uniqueString)
            console.log(result[0].uniqueString)
            compResult = await bcrypt.compare(uniqueString, result[0].uniqueString)
            .then((compResult)=>{
                if(compResult){  
                    console.log(compResult)
                    req.session.autherized = true        
                    req.session.email = email           
                    res.redirect(`/setNewPass/${email}`)       
                    db.query("DELETE FROM emailver WHERE email = ?",[email], (error)=>{
                        if(error){       
                            console.log("Error occured while deleting the reset password string ", error);    
                        }else{
                            console.log("UniqueString Deleted successfully!")
                        }  
                    }) 
                }else{ 
                    res.render("newPassword", {message: "This link is invalid, please request another link"})     
                }
            })
            .catch((e)=>{    
                console.log("Error while comparing the unique strings  " + e)
                res.render("newPassword", {message: "This link is invalid, please request another link"})     
            })
            
        }else{
            res.render("newPassword", {message: "This link is invalid, please request another link"})
        }
        if(error){
            console.log("Error while searching for the unique string")
            res.render("newPassword", {message: "This link is invalid, please request another link"})
        }
    })

}) 
//const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;

router.post("/newPassword", (req, res)=>{
    let email = req.session.email
    let {password, conPassword} = req.body  
    console.log(req.body)
    if(password !== conPassword){
        res.render('setNewPass',{         
        failMessage:"Password and confirm password must be the same, please try again"
        });   
    }else{
            console.log("aces")
            let hashedPass = bcrypt.hash(password, 8)
            .then((hashedPass)=>{
                db.query("UPDATE USERS_DB.USER_INFO SET password = ? WHERE email = ?", [password,email],(error)=>{
                    if(error){     
                        console.log("Error while setting the new password ", e)     
                    }else{
                        res.render("login", {message: "Password changed successfully"})
                    }
                })
            })
            .catch((e)=>{console.log("Error while hashing the password")})
       /*}else{
            res.render('setNewPass',{
                failMessage:"Your password must include both lower and upper case charachter, at least one number or symbol,and at least 8 characters"
            });
        }  
        */   
    }
})

module.exports = router    

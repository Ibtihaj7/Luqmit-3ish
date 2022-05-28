const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt") 
const db = require("../config/db")  
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))  

passEmail = require('../config/passwordRequest')  // Forget password

router.post("/newPasswordReq", (req, res)=>{
    let {email} = req.body   
    db.query("SELECT EMAIL FROM account WHERE EMAIL = ?", [email], async(error, result)=>{
        if(error){
            console.log("Error while chicking if the user exists in the DB")  
            res.redirect('/errorPage') 
        }else{
            if(result.length > 0){   
                const validMessage ="تم ارسال رابط الى بريدك الالكتروني، يرجى فتح الرابط من بريدك الإلكتروني لتتمكن من إعادة تعيين كلمة المرور الخاصة بك"
                const invalidMessage = false;
                passEmail.sendVerEmail(email)
                res.render("newPassword", {validMessage ,invalidMessage})
            }else{
                const validMessage =false
                const invalidMessage =  "يرجى إدخال البريد الإلكتروني بشكل صحيح"
                res.render("newPassword", {validMessage , invalidMessage})          
            }
        }
    }) 
})

router.get("/resetRequest/:email/:passwordUUID", (req, res)=>{
    let {email, passwordUUID} = req.params 
    db.query("SELECT passwordUUID FROM account WHERE email= ?", [email], async (error, result)=>{
        const validMessage = false;
        const invalidMessage =  'هذا الرابط غير صالح ، يرجى طلب رابط آخر'
        if(result[0].passwordUUID){
            let compResult    
            compResult = await bcrypt.compare(passwordUUID, result[0].passwordUUID)
            .then((compResult)=>{
                if(compResult){  
                    console.log(compResult)
                    req.session.autherized = true        
                    req.session.email = email           
                    res.redirect(`/setNewPass`)    
                    db.query("UPDATE account SET passwordUUID = NULL WHERE email = ?",[email], (error)=>{      
                        if(error){       
                            console.log("Error occured while deleting the reset password string ", error);    
                        } 
                    }) 
                }else{ 
                    res.render("newPassword", {validMessage,invalidMessage})     
                }
            })
            .catch((e)=>{   
                console.log("Error while comparing the unique strings  " + e)
                res.render("newPassword", { validMessage, invalidMessage})     
            })
            
        }else{
            res.render("newPassword", { validMessage, invalidMessage} )
        }
        if(error){
            console.log("Error while searching for the unique string")      
            res.redirect('/errorPage')
        }
    })
}) 
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
  
router.put("/newPassword", (req, res)=>{
    let email = req.session.email
    let {password, conPassword} = req.body   
    if(password !== conPassword){ 
        const invalidMessage = 'يجب أن تكون كلمة المرور وتأكيد كلمة المرور متطابقتين ، يرجى المحاولة مرة أخرى'
        res.render('setNewPass',{ invalidMessage });   
    }else{
        if(!(regePassword.test(password))){  
            const invalidMessage = 'يجب أن تتضمن كلمة المرور الخاصة بك أحرفًا صغيرة وكبيرة ، ورقمًا أو رمزًا واحدًا على الأقل و 8 أحرف على الأقل'
            res.render('setNewPass',{ invalidMessage });                              
        }else{
            let hashedPass = bcrypt.hash(password, 8)
            .then((hashedPass)=>{        
                db.query("UPDATE account SET password = ? WHERE email = ?", [hashedPass, email],(error)=>{
                    if(error){
                        console.log("Error while setting the new password ", error) 
                        res.redirect('/errorPage')
                    }     
                    const validmessage = 'تم تغيير كلمة المرور بنجاح';
                    const invalidMessage = false;
                    res.render("logIn", { validmessage,invalidmessage: false }) 
                    req.session.autherized = false
                })
            })
            .catch((e)=>{
                console.log("Error while hashing the password")
                res.redirect('/errorPage')    
            })
        }
    }
})          


module.exports = router
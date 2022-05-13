const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt") 
const db = require("../config/db") 
const cryptr = require('../config/cryptr');
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))   

router.get("/user/verify/:hashed", async(req ,res)=>{
    let {hashed} = req.params; 
    const Info = cryptr.decrypt(hashed).split("|");
    const Information = {
        name : Info[0],
        email : Info[1],
        phone : Info[2],
        password : Info[3],
        type : Info[4]
    }
    hashedPassword = await bcrypt.hash(Information.password, 8);
    db.query('INSERT INTO account SET ?',{name:Information.name,email:Information.email,phone:Information.phone,password:hashedPassword,type:Information.type},(err,result) => {
        if(err){
            throw err;
        }
        else{
            db.query('SELECT * FROM account WHERE email= ? and type = ?',[Information.email,"resturant"],(err,res) => {
                db.query('INSERT INTO menu SET ?',{category:'وجبات رئيسية',discription:'غير متوفر',quantity:0,account_id:res[0].id},(err,res) => {
                    if(err)throw err     
            })
            db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:'غير متوفر',quantity:0,account_id:res[0].id},(err,res) => {
                if(err)throw err     
            })
            db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:'غير متوفر',quantity:0,account_id:res[0].id},(err,res) => {
                if(err)throw err     
            })
            db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:'غير متوفر',quantity:0,account_id:res[0].id},(err,res) => {
               if(err)throw err     
            })
            db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:'غير متوفر',quantity:0,account_id:res[0].id},(err,res) => {
                if(err)throw err     
            })
            db.query('INSERT INTO menu SET ?',{category:'وجبات سريعة',discription:'غير متوفر',quantity:0,account_id:res[0].id},(err,res) => {
                if(err)throw err     
            })
            })
            
            res.redirect('/Login');
        }
    });

})

//Reset Password 
passEmail = require('../config/passwordRequest')  // Forget password

router.post("/newPasswordReq", (req, res)=>{
    let {email} = req.body   
    db.query("SELECT EMAIL FROM account WHERE EMAIL = ?", [email], async(error, result)=>{
        if(error){
            console.log("Error while chicking if the user exists in the DB")  
            res.render("newPassword", {message: "Something went wrong please try again"})
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
        const validMessage =false;
        const invalidMessage =  'هذا الرابط غير صالح ، يرجى طلب رابط آخر'
        if(result[0].passwordUUID){
            let compResult    
            compResult = await bcrypt.compare(passwordUUID, result[0].passwordUUID)
            .then((compResult)=>{
                if(compResult){  
                    console.log(compResult)
                    req.session.autherized = true        
                    req.session.email = email           
                    res.redirect(`/setNewPass/${email}`)       
                    db.query("UPDATE account SET passwordUUID = NULL WHERE email = ?",[email], (error)=>{      
                        if(error){       
                            console.log("Error occured while deleting the reset password string ", error);    
                        }else{
                            console.log("passwordUUID Deleted successfully!")
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
            res.render("newPassword", { validMessage, invalidMessage})
        }
    })
}) 
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
  
router.put("/newPassword", (req, res)=>{
    let email = req.session.email
    let {password, conPassword} = req.body   
    if(password !== conPassword){ 
        const failMessage = 'يجب أن تكون كلمة المرور وتأكيد كلمة المرور متطابقتين ، يرجى المحاولة مرة أخرى'
        res.render('setNewPass',{ failMessage });   
    }else{
        if(!(regePassword.test(password))){  
            const failMessage = 'يجب أن تتضمن كلمة المرور الخاصة بك أحرفًا صغيرة وكبيرة ، ورقمًا أو رمزًا واحدًا على الأقل و 8 أحرف على الأقل'
            res.render('setNewPass',{ failMessage });                              
        }else{
            let hashedPass = bcrypt.hash(password, 8)
            .then((hashedPass)=>{        
                db.query("UPDATE account SET password = ? WHERE email = ?", [hashedPass,email],(error)=>{
                    if(error){     
                        console.log("Error while setting the new password ", e)     
                    }else{
                        const message = 'تم تغيير كلمة المرور بنجاح'
                        res.render("logIn", { message })
                    }
                })
            })
            .catch((e)=>{console.log("Error while hashing the password")})
        }
    }
})          


module.exports = router
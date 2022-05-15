const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql=require('mysql');
const regePassword = /^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){2,}).{8,}$/;
const db = require("../config/db") 
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))  

router.put('/changePassword',(req,res) => {
id = req.session.userId
if(!id) return res.redirect('/endSeccion')
let curentPassword=req.body.curentPassword;
let newPassword = req.body.newPassword;
let confirmPassword = req.body.confirmPassword;

db.query("SELECT* FROM account WHERE id=? ",[id],async(error,results) => {

    if(error){
        console.log('error');
        return error
    }
    
    if (!(results.length  && bcrypt.compareSync(curentPassword,results[0].password))){
    
        return res.render('changePassword',{
           message:"أدخل كلمة مرور حسابك بشكل صحيح"
        });
    } else if(newPassword!==confirmPassword){
        
        return res.render('changePassword',{
            message:"كلمة المرور لا تتطابق مع تأكيد كلمة المرور"
        })
    }else if(!(regePassword.test(newPassword))){
     
        return res.render('changePassword',{
            message:"الرجاء إدخال كلمة مرور صالحة ، ويجب أن تشتمل على أحرف صغيرة وكبيرة ، ورقم أو رمز واحد على الأقل ، وطول 8 أحرف على الأقل"
        });
    }else {
        let hashedPassword = await bcrypt.hash(newPassword , 8);
        db.query("UPDATE account SET password = ? WHERE id = ?", [hashedPassword,id],(error)=>{
            if(error){     
                console.log("Error when resetting password")     
            }else{

                if(results[0].type=="resturent")
                res.render("resHomePage",{ message: "Password changed successfully"})
                else{
                    res.redirect('/charity')  
                }
            }
        })    
    }
});
})

module.exports=router;
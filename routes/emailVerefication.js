const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")  

router.get("/user/verify/:id/:uniqueString", (req ,res)=>{
    let {id, uniqueString} = req.params;
    db.query("SELECT uniqueString FROM emailver WHERE email= ?", [id], async (err, result)=>{
        if(err){
            console.log(err +"error while verefication")
        }else{    
            if(result.length > 0){
                let compResult
                compResult = await bcrypt.compare(uniqueString, result[0].uniqueString)
                .then((compResult)=>{
                    if(compResult){
                        db.query("UPDATE USERS_DB.USER_INFO SET verified = 1 WHERE email = ?", [id], (error)=>{
                            if(error){
                                console.log(error + "Error while verifying the user")
                            }else{  
                                res.render('login',{
                                    message:'Email veriefied Succesfully'
                                })     
                                db.query("DELETE FROM emailver WHERE email = ?",[id], (error)=>{
                                    if(error){
                                        console.log("Error occured while deleting the verificarion string ", error);    
                                    }else{
                                        console.log("UniqueString Deleted successfully!")
                                    }  
                                }) 
                            }
                        })  
                    }else{    
                        res.render("register", {message: "Please request another verification link by contacting us"})  
                    }
                })
                .catch((e)=>{
                    console.log("Error while comparing the unique string with the hashed one") 
                    res.render("register", {message: "Please try to verify your account later"})     
                })
            }else{ 
                res.send("This link is not valid anymore!")
            }
        }
    })
})

module.exports = router
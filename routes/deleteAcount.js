const express = require("express");
const router = express.Router();
const mysql=require('mysql');
const db = require("../config/db") 
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))  

router.delete('/delete', (req,res) => {
    
    id = req.session.userId
    if(!id) return res.redirect('/endSeccion')
    const deleted="DELETE FROM account WHERE id=? "
    db.query(deleted,[id],(error,results) => {
        if(error){
            console.log("error in delete account")
            return error 
        }
        else{
         res.redirect("/")
        }

    })

})
module.exports=router;
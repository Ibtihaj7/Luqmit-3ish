const express = require("express");
const router = express.Router();
const mysql=require('mysql');
const db = require("../config/db") 
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))  

router.delete('/delete', (req,res) => {
    
    id = req.session.userId
 
    if(!id) return res.redirect('/endSeccion')
    db.query("DELETE FROM account WHERE id=? ",[id],(error,results) => {
    
       console.log(results)
        if(error){
            console.log('error in delete query');
            return error
        }
        else{
          
         res.redirect("/home")
        }


    })


})
module.exports=router;
const express = require("express");
const router = express.Router();
const mysql=require('mysql');
const db = require("../config/db") 
const methodOverride = require("method-override")  
router.use(methodOverride("_method"))  

router.delete('/delete', (req,res) => {
    
    id = req.session.userId
 console.log(id)
    if(!id) return res.redirect('/endSeccion')
    db.query("DELETE FROM account WHERE id=? ",[id],(error) => {
        console.log(id)

        if(error){
            return error
           
        }
        else{

         res.redirect("/home")

        }


    })


})
module.exports=router;
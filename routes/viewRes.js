const express = require('express');
const router = express.Router();
const db = require("../config/db") 
router.get('/page/:id', (req,res)=>{  
    db.query("SELECT * from menu WHERE account_id = ?",[req.params.id], (error,result)=>{
        if(error)throw error;
        db.query("SELECT * from account WHERE id = ?",[req.params.id], (error,ress)=>{
            if(error) throw error
            res.render('viewResPage',{
                resdata:result,
                resName:ress[0].name,
                resturantId: req.params.id
            })
        })
    })
})
module.exports = router;
const express = require('express');
const router = express.Router();
const db = require("../config/db") 
router.get('/page/:id', (req,res)=>{  
    db.query("SELECT * from menu WHERE account_id = ?",[req.params.id], (error,newResult)=>{
        if(error){
            console.log("Error while updating the quantity     "+error)
            res.redirect(`/viewRes/page/${req.params.id}`)  
        }else{ 
        db.query("SELECT * from account WHERE id = ?",[req.params.id], (error,ress)=>{
            if(error){
                console.log("Error while updating the quantity     "+error)
                res.redirect(`/viewRes/page/${req.params.id}`)  
            }else{
                db.query("SELECT * from account WHERE id = ?",[req.session.userId], (error,charityInfo)=>{
                    if(error){
                        console.log("Error while updating the quantity     "+error)
                        res.redirect(`/viewRes/page/${req.params.id}`)  
                    }else{
                        res.render('viewResPage',{
                            resdata:newResult,
                            resName:ress[0].name,
                            resturantId: req.params.id,
                            charityInfo: charityInfo[0]
                        })
                    }   
                })
            }
        })
    }
})
})
module.exports = router;
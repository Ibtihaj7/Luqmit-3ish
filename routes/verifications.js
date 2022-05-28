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
                if(err)throw err;
                if(res.length>0){
                    db.query('INSERT INTO menu SET ?',{category:'وجبات رئيسية',discription:'اسم الوجبة',quantity:0,account_id:res[0].id},(err,res) => {
                        if(err)throw err    
                    })
                    db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:'اسم الوجبة',quantity:0,account_id:res[0].id},(err,res) => {
                        if(err)throw err     
                    })
                    db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:'اسم الوجبة',quantity:0,account_id:res[0].id},(err,res) => {
                        if(err)throw err     
                    })
                    db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:'اسم الوجبة',quantity:0,account_id:res[0].id},(err,res) => {
                       if(err)throw err     
                    })
                    db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:'اسم الوجبة',quantity:0,account_id:res[0].id},(err,res) => {
                        if(err)throw err     
                    })
                    db.query('INSERT INTO menu SET ?',{category:'وجبات سريعة',discription:'اسم الوجبة',quantity:0,account_id:res[0].id},(err,res) => {
                        if(err)throw err     
                    })
                }
            })
            
            res.redirect('/Login');
        }
    });

})

module.exports = router
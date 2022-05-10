const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const db = require("../config/db") ;

const app = express();
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")
app.use(cookieParser());

router.get('/',(req,res) => {
    res.render('home'); 
});
router.get('/endSeccion',(req,res) => {
    res.render("endSession");
})
router.get('/register',(req,res) => {
    res.render('signUp'); 
});
router.get('/resmenu',(req,res) => {
    res.render('resmenu')
})
router.get("/newPassword", (req, res)=>{
    res.render("newPassword");
})
router.get("/Login",(req,res)=>{
    res.render("logIn");
})
router.get("/setNewPass/:email", (req, res)=>{
    if(req.session.autherized){
        res.render("setNewPass");
    }else{
        res.render("newPassword", {failMessage: "You must recieve an email to be able to reset your password "})
    }
})
router.get("/changePassword",(req,res) => {
    res.render("changePassword");
})
router.get("/DeleteAcount",(req,res) => {
    res.render("DeleteAcount");
})

router.get("/user",(req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    db.query("SELECT * from account WHERE id = ?",[req.session.userId], (error,result)=>{
            res.render("profilePage",{
                data:result
            });
    })
})
router.get("/contactUs", (req, res)=>{
    res.render("contactUs", {message: false})
})
router.get("/edit", (req,res)=>{
    res.render('EditProfilePage');
})
router.get('/restaurant',(req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    db.query("SELECT * from menu WHERE account_id = ?",[req.session.userId], (error,result)=>{
        if(error) throw error;
        else{
            db.query("SELECT orders.id, account.name, orders.quantity, menu.category,orders.date FROM account JOIN orders ON account.id = orders.account_id JOIN menu ON orders.menu_id = menu.id WHERE menu.account_id =?",req.session.userId, (error,ress)=>{
                return res.render('resHomePage',{
                    res1:result[0].discription,
                    res11:result[0].quantity,
                    res2:result[1].discription,
                    res22:result[1].quantity,
                    res3:result[2].discription,
                    res33:result[2].quantity,
                    res4:result[3].discription,
                    res44:result[3].quantity,
                    res5:result[4].discription,
                    res55:result[4].quantity,
                    res6:result[5].discription,
                    res66:result[5].quantity,
                    resdata:ress
                })
            })
            
    }
});
})
router.get('/charity',(req,res)=>{
        db.query("SELECT * from account ",(err,results)=>{
            res.render("charHomePage",{
                resdata:results
            });
        })
})
module.exports = router;
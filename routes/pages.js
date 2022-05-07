const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const app = express();
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")
app.use(cookieParser());

router.get('/',(req,res) => {
    res.render('home'); 
});
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
router.get("/profile",(req,res)=>{
    res.render("profilePage");
})
router.get("/contactUs", (req, res)=>{
    res.render("contactUs")
})

module.exports = router;
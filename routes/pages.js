const express = require('express');
const router = express.Router();

const app = express();
app.set('view engine','hbs')

router.get('/',(req,res) => {
    res.render('home'); 
});
router.get('/register',(req,res) => {
    res.render('signUp'); 
});

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


module.exports = router;
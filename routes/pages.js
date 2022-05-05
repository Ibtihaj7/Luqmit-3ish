const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine','hbs')
app.use(cookieParser());

function validateCookie(req, res, next){
    const{cookies}=req;
    if ('session_id' in cookies){
      console.log('Session ID Exists.');
      if (cookies.session_id === '123456') next();
      else res.status (403).send ({ msg: 'Not Authenticated' });
     }else res.status (403).send ({ msg: 'Not Authenticated' });
  }

router.get('/',validateCookie,(req,res) => {
    res.cookie('visited',true,{
        maxAge:50000,
    })
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
router.get("/changePassword",(req,res) => {
    res.render("changePassword");
})
router.get("/profile",(req,res)=>{
    res.render("profilePage");
})

module.exports = router;
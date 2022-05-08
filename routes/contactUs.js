const express = require('express');  
const router = express.Router();
const sendContactUsEmail = require("../config/contactUs")


router.post('/contact',(req, res)=>{   
    sendContactUsEmail.sendContactUsEmail(req.body)  
    res.render("contactUs", {message: ".نشكرك على تواصلك معنا "})   
});

module.exports = router;
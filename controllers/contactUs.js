const sendContactUsEmail = require("../config/contactUs")

exports.contactUs = (req, res)=>{
    sendContactUsEmail.sendContactUsEmail(req.body)  
    res.render("contactUs", {message: ".نشكرك على تواصلك معنا "})  
} 
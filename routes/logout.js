const express = require('express'); 
const router = express.Router();

router.get('/logout',(req, res)=>{
    req.session.destroy(); 
    res.redirect("/Login")
})

module.exports = router
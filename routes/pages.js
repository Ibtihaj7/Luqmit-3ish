const express = require('express');
const router = express.Router();

const app = express();
app.set('view engine','hbs')

router.get('/',(req,res) => {
    res.render('signUp'); 
});
router.get('/register',(req,res) => {
    res.render('signUp'); 
});

module.exports = router;
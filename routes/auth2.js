const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require("../config/db") 
router.post('/signIn',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM account WHERE email = ? ", [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.length  && bcrypt.compareSync(password,results[0].password)) {
            req.session.userId = results[0].id;
            if(results[0].type ==='resturant'){
                db.query('SELECT * FROM account WHERE id=?',[req.session.userId],(err,result) => {
                    return res.render('resHomePage')
                })

            }else{ 
                db.query("SELECT * FROM account ", (error, results) => {
                    return res.render('charHomePage',{
                        resdata:results
                    })
                })
        }
        } else {
            return res.render("logIn", {
            message: "password or email is incorrect"
        });
      }
    }
  );
});

module.exports = router;
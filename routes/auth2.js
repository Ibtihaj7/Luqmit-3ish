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
                return res.redirect("/restaurant");

            }else{ 
                return res.redirect("/charity");
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
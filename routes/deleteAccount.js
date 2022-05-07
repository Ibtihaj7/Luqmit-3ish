const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql=require('mysql');
const db = require("../config/db") 


router.get('/delete/:id', function(req, res, next) {
    var id =  req.params.id 
        db.query('DELETE FROM account WHERE id = ' + [id], account, function(err, result) {
            if (err) {
                req.flash('error', err)
                res.redirect('/')
            } else {
                req.flash('success', 'User has been deleted successfully! id = ' + req.params.id)
                res.redirect('/')
            }
        })
   })

   module.exports = router;
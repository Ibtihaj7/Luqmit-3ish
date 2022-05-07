const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql=require('mysql');
const db = require("../config/db") 

router.get('/delete/:id', function(req, res, next) {
    var id= req.params.id;
      var sql = 'DELETE FROM account WHERE id = ?';
      db.query(sql, [id], function (err, data) {
      if (err)
       throw err;
      console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/deleteAccount');
    
});
const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcryptjs');
const app = express();
const db = require('../app').db;
app.set("view engine", "hbs");
app.use(express.static("public"));

exports.Login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM account WHERE email = ? ", [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length  && bcrypt.compareSync(password,results[0].password)) {
        req.session.id = result[0].id;
        return res.render("home",{
            message:`welcome ${results[0].name}`
        });
      } else {
        return res.render("logIn", {
          message: "password or email is incorrect"
        });
      }
    }
  );
};


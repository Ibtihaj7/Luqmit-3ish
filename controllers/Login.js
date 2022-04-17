const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcryptjs');
const app = express();

app.set("view engine", "hbs");
app.use(express.static("public"));

const db = mysql.createConnection({
    host: process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
   
}) 
exports.Login = (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  db.query("SELECT * FROM account WHERE email = ? ", [email], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length  && bcrypt.compareSync(password,results[0].password)) {
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


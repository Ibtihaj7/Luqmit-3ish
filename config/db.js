const mysql = require("mysql")
const dotenv = require('dotenv').config()    
     
try{
    let connection = mysql.createConnection({
        host: process.env.host,
        user:process.env.user,
        password:process.env.password,
        database:process.env.database
    })
    module.exports = connection;

}catch(e){
    console.log("DB Connenction  " + e)  
}
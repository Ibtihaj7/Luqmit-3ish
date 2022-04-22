const nodemailer = require('nodemailer')
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
const db = require('./db')
const dotenv = require('dotenv').config()                   

function sendVerEmail(email){
    //url to be used in the email 
    currentURL = "http://localhost:3000/"
    const uniqueString = uuidv4();   

    //nodemailer staff 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth:{
            user: process.env.email, 
            pass: process.env.emailPassword,          
        }
    })  
    transporter.verify((error, success) =>{
        if(error){
            console.log("Failed to send Email" + error);
        }else{
            console.log("Email sent successfully")
        }
    })

//Step 2
    let mailOption = {
        from: 'Admin',   
        to: email, 
        subject: 'Verify your email', 
        html: `<p>Complete your sign up into your account using the link below. </p>
         <a href = ${currentURL + "user/verify/"+ email + "/" + uniqueString}> Click here to complete the process</a>`
    };
    //hash the unique string
    hasheduniqueString = bcrypt.hash(uniqueString, 10)
    .then((hasheduniqueString) => {
        // seet values in
        //UPDATE account SET verified = 1, emailUUID = NULL WHERE email = ?
        //INSERT INTO `users_db`.`emailver` (`email`, `uniqueString`) VALUES (?, ?)
        db.query("UPDATE account SET emailUUID = ? WHERE email = ?  ", [hasheduniqueString, email], (err)=>{
            if(err){
                console.log("Error while inserting the uniqueString to the DB");
                res.render("logIn", {message: "Please request another verification email"})
            }else{//step 3 
                transporter.sendMail(mailOption, function(err, data){
                    if(err){
                        console.log("Error While sending the verefication email! " + err)
                    }else{
                        console.log("Done !!!!!")
                    }
                })//senMail
            }//else 
        })
    })
    .catch((e)=>{
        console.log("Error while hasihng the unique string  ", e)
        res.render("logIn", {message: "Please request another verification email"})
    })
}

module.exports = {sendVerEmail}
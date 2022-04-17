const nodemailer = require('nodemailer')
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcrypt")
const db = require('../db')
require("dotenv").config()

function sendVerEmail(email){
    //url to be used in the email 
    currentURL = "http://localhost:3000/"
    const uniqueString = uuidv4() + email;

    //nodemailer staff 
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth:{
            user: 'unstoppableteam826@gmail.com', 
            pass: '123123unstoppableteam826', 
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
        subject: 'Reset Password Request', 
        html: `<p>Please click below to be able to reset your password. </p>
         <a href = ${currentURL + "resetRequest/"+ email + "/" + uniqueString}> Click here </a>`
    };
    //hash the unique string
    hasheduniqueString = bcrypt.hash(uniqueString, 10)
    .then((hasheduniqueString) => {
        // seet values in
        db.query("INSERT INTO `users_db`.`emailver` (`email`, `uniqueString`) VALUES (?, ?)", [email, hasheduniqueString], (err)=>{
            if(err){
                console.log("Error while inserting the uniqueString for password to the DB");
                res.render("newPassword", {message: "Please request another verification email"})
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
        res.render("newPassword", {message: "Please request another verification email"})
    })
}

module.exports = {sendVerEmail}
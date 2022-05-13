const nodemailer = require('nodemailer')
const bcrypt = require("bcrypt")
const db = require('./db')
const dotenv = require('dotenv').config()

function sendVerEmail(email,hashedInfo){
    //url to be used in the email 
    currentURL = "http://localhost:3000/"

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

    let mailOption = {
        from: 'Admin',   
        to: email, 
        subject: 'Verify your email', 
        html: `<p>Complete your sign up into your account using the link below. </p>
         <a href = ${currentURL + "user/verify/"+ hashedInfo}> Click here to complete the process</a>`
    };
 
        transporter.sendMail(mailOption, function(err, data){
            if(err){
                console.log("Error While sending the verefication email! " + err)
                 }else{
                        console.log("Done !!!!!")
                    }
                })//senMail
}

module.exports = {sendVerEmail}
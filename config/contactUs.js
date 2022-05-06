const nodemailer = require('nodemailer')         
const dotenv = require('dotenv').config()          

function sendContactUsEmail(bodyText){ 
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
        from: 'لقمة عيش',       
        to: "ramahaseeba@gmail.com",                       
        subject: `${bodyText.subject}`, 
        html: `  
        <h5>اسم المرسل : ${bodyText.name} </h5>  
        <h5> ${bodyText.email} ايميل المرسل :  </h5>      
        <h5>رقم المرسل : ${bodyText.phone} </h5> 
        <br>       
        <p>${bodyText.letter}</p>   
        `
    }; 

    transporter.sendMail(mailOption, function(err, data){
        if(err){
            console.log("Error While sending the verefication email! " + err)
        }else{
            console.log("Done!")
        }   
    })//sendMail
}

module.exports = {sendContactUsEmail}     
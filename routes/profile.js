const express = require('express');
const router = express.Router();
const upload = require('express-fileupload');
const db = require("../config/db")
 const methodOverride = require("method-override");  
 const { render } = require('ejs');
const e = require('connect-flash');
 router.use(methodOverride("_method"))  
 router.use(upload());
router.put('/edit', (req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const website = req.body.website;
    const location = req.body.location;
    const file = req.files.image;
    const filename = file.name;
    id = req.session.userId;
    db.query("SELECT * from account WHERE id = ?",[id], (error,result)=>{
        if(error){
            console.log(error);
        }
        if(result.length > 0){
           if(name && name != result[0].name){
               db.query("UPDATE account SET name = ? WHERE id = ?",[name,id], (error)=>{
                   if(error){throw error;}
               });
           }
           if(email && email != result[0].email){
               db.query("UPDATE account SET email = ? WHERE id = ?",[email,id],(error)=>{
                   if(error){throw error;}
               });
           }
           if(phone && phone != result[0].phone){
            db.query("UPDATE account SET phone = ? WHERE id = ?",[phone,id],(error)=>{
                if(error){throw error;}
            });
        }
        if(website && website != result[0].website){
            db.query("UPDATE account SET website = ? WHERE id = ?",[website,id],(error)=>{
                if(error){throw error;}
            });
        }
        if(location && location != result[0].location){
            db.query("UPDATE account SET location = ? WHERE id = ?",[location,id],(error)=>{
                if(error){throw error;}
            });
        }
        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
            file.mv("./public/uploads" + "/" + filename, (err,)=>{
                if(err){
                    console.log("error while uploading the photo" + err);
                }
                else{
                    db.query("UPDATE account SET img = ? WHERE id = ?",[filename,id],(err)=>{
                        if(err){
                            console.log("error while storing image in db" + err);
                        }
                        else{
                            console.log("file stored");
                        }
                    })
                }
            })
        }
        // else{
        //     message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
        //             res.render('EditProfilePage.ejs',{message: message});
        // }
    }
        res.redirect("/user");
        
    });
    
})
router.post('/display/:restaurantid',(req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion');
    let id = req.params.restaurantid;
    const btn = false;
    db.query("SELECT * from account where id = ?",[id],(err,result)=>{
        if(err) throw err;
        else{
           res.render("ProfilePage",{data:result,btn});
        }
    })

})

module.exports = router;
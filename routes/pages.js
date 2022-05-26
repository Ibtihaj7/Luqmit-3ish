const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const db = require("../config/db") ;

const app = express();
app.set('views', __dirname + '/views');
app.set("view engine", "ejs")
app.use(cookieParser());

router.get('/',(req,res) => {
    res.render('home'); 
});
router.get('/endSeccion',(req,res) => {
    res.render("endSession");
})
router.get('/register',(req,res) => {
    const validmessage = false;
    const invalidmessage = false;
    res.render('signUp',{validmessage,invalidmessage}); 
});

router.get("/newPassword", (req, res)=>{
    const validMessage = false
    const invalidMessage = false
    res.render("newPassword",{validMessage,invalidMessage});
})

router.get("/Login",(req,res)=>{
    const invalidmessage = false;
    const validmessage = false;
    res.render("logIn",{validmessage,invalidmessage});
})

router.get("/setNewPass/:email", (req, res)=>{ 
    const invalidMessage = false 
    if(req.session.autherized){
        res.render("setNewPass",{validMessage:true, invalidMessage:invalidMessage });
    }else{
        const invalidMessage = 'يجب أن تتلقى بريدًا إلكترونيًا لتتمكن من إعادة تعيين كلمة المرور الخاصة بك'
        res.render("newPassword", { invalidMessage:invalidMessage, validMessage:false })
    }
})

router.get("/changePassword",(req,res) => {
    if(!req.session.userId) return res.redirect('/endSeccion')
    res.render("changePassword",{message:false});
})

router.get("/DeleteAcount",(req,res) => {
    res.render("DeleteAcount");
})

router.get("/user",(req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    const btn = true
    db.query("SELECT * from account WHERE id = ?",[req.session.userId], (error,result)=>{
            res.render("profilePage",{
                data:result, btn
            });
    })
})
router.get("/contactUs", (req, res)=>{
    res.render("contactUs", {message: false})
})
router.get("/edit", (req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    res.render('EditProfilePage',{message:false});
})
router.get('/restaurant',(req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    db.query('SELECT * FROM account WHERE id=?',[req.session.userId],(err,data) => {
        if(err)throw err
        if(data[0].type==='resturant'){
            db.query("SELECT * from menu WHERE account_id = ?",[req.session.userId], (error,result)=>{
                if(error) throw error;
                else{ 
                    db.query("SELECT orders.account_id,menu.discription, orders.id, account.name, orders.quantity, menu.category,orders.date FROM account JOIN orders ON account.id = orders.account_id JOIN menu ON orders.menu_id = menu.id WHERE menu.account_id =?",req.session.userId, (error,ress)=>{
                        return res.render('resHomePage',{
                            res1:result[0].discription,
                            res11:result[0].quantity,
                            res2:result[1].discription,
                            res22:result[1].quantity,
                            res3:result[2].discription,      
                            res33:result[2].quantity,
                            res4:result[3].discription,
                            res44:result[3].quantity,
                            res5:result[4].discription,
                            res55:result[4].quantity,
                            res6:result[5].discription,
                            res66:result[5].quantity,
                            resdata:ress
                        })
                    })  
                }
            });
        }else{
            res.redirect('/charity')
        }
    })

})
router.get('/charity',(req,res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    db.query('SELECT * FROM account WHERE id=?',[req.session.userId],(err,data) => {
        if(err)throw err
            if(data[0].type==='charity'){
                db.query("SELECT * from account where type=?",['resturant'],(err,results)=>{
                    res.render("charHomePage",{ resdata:results });
                })
            }else{
                res.redirect('/restaurant')
            }
    })
}) 

router.get('/error',(req,res) => {
    res.render('home')
})

router.get('/viewRes/page/:id', (req,res)=>{ 
    if(!req.session.userId) return res.redirect('/endSeccion')
    db.query("SELECT * from menu WHERE account_id = ?",[req.params.id], (error,newResult)=>{
        if(error){
            console.log("Error while updating the quantity     "+error)
            res.redirect(`/viewRes/page/${req.params.id}`)  
        }else{ 
            db.query("SELECT * from account WHERE id = ?",[req.params.id], (error,ress)=>{
                if(error){
                    console.log("Error while updating the quantity     "+error)
                    res.redirect(`/viewRes/page/${req.params.id}`)  
                }else{
                    db.query("SELECT * from account WHERE id = ?",[req.session.userId], (error,charityInfo)=>{
                        if(error){
                            console.log("Error while updating the quantity     "+error)
                            res.redirect(`/viewRes/page/${req.params.id}`)  
                        }else{
                            res.render('viewResPage',{
                                resdata:newResult,
                                resName:ress[0].name,
                                resturantId: req.params.id,
                                charityInfo: charityInfo[0],
                                failMessage: false
                            })
                        }   
                    })
                }
            })
        }
    })
})

router.get('/charityHome', (req, res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion') 
    db.query("SELECT * from account where type=?",['resturant'],(err,results)=>{
        if(err){
            console.log("Error while retrieving accounts info       " + err)
            res.render('error') 
        }
        res.render("successOrders",{ resdata:results });
    }) 
})

router.get('/charityReservations',(req, res)=>{
    db.query('SELECT orders.account_id,menu.discription, orders.id, account.name, orders.quantity, menu.category,orders.date FROM account JOIN orders ON account.id = orders.account_id JOIN menu ON orders.menu_id = menu.id WHERE account.id =?',req.session.userId, (error,ress)=>{
        return res.render('charityReservations',{
            resdata:ress
        })
    })
})

router.get('/errorPage',(req, res)=>{
    res.render('error')
})

module.exports = router;

const express = require("express")
const router = express.Router()
const db = require('../config/db')

router.post("/submitOrders", (req, res)=>{
    if(!req.session.userId) return res.redirect('/endSeccion')
    const chrityId = req.session.userId
    const resturantId = req.body.resturantId   
    const menuId = req.body.menuId.split("،")
    const currentTime = new Date()  
    let frequency = [] 
        if(req.body.menuId.length){
        db.query("SELECT * FROM luqmataish.menu where account_id =? ", [resturantId], (error, _result)=>{
            if(error){
                console.log("Error while retreiving menu ids     "+error)
                res.redirect(`/viewRes/page/${resturantId}`)
            }else{
                for(let i = 0; i<_result.length; i++){
                    frequency.push(menuId.filter(x => x == _result[i].id).length) 
                }

                for(let i = 0; i < _result.length; i++){
                    db.query("select * from luqmataish.orders where account_id =? and menu_id =?", [chrityId, _result[i].id], (error, ordersResult)=>{
                        if(error){
                            console.log("Error while retreiving from orders     "+error)
                            res.redirect('/errorPage')             
                        }else{ 
                            if(ordersResult.length == 0){
                                if(frequency[i] != 0){
                                    db.query("INSERT INTO `luqmataish`.`orders` (`date`, `time`, `quantity`, `account_id`, `menu_id`) VALUES (?, ?, ?, ?, ?)", [currentTime.toLocaleDateString(), currentTime.toLocaleTimeString(), frequency[i], chrityId, _result[i].id], (error, result)=>{
                                        if(error){
                                            console.log("Error while retreiving from orders     "+error)
                                            res.redirect('/errorPage') 
                                        }else{
                                            db.query("UPDATE `luqmataish`.`menu` SET quantity = ? WHERE id =?",[_result[i].quantity - frequency[i], _result[i].id], (error, result)=>{
                                                if(error){
                                                    console.log("Error while updating the quantity     "+error)
                                                    res.redirect('/errorPage') 
                                                }
                                            })
                                        }
                                    })
                                }
                            }else{
                                if(frequency[i] != 0){
                                    db.query("UPDATE `luqmataish`.`orders` SET quantity = ? WHERE id =?",[ordersResult[0].quantity + frequency[i], ordersResult[0].id], (error, result)=>{
                                        if(error){
                                            console.log("Error while updating the quantity     "+error)
                                            res.redirect('/errorPage') 
                                        }else{
                                            db.query("UPDATE `luqmataish`.`menu` SET quantity = ? WHERE id =?",[_result[i].quantity - frequency[i], _result[i].id], (error, result)=>{
                                                if(error){
                                                    console.log("Error while updating the quantity     "+error)
                                                    res.redirect('/errorPage') 
                                                }
                                            }) 
                                        } 
                                    })

                                }
                            }
                        }
                    })
                }
            }
        })
        
        res.redirect(`/charityHome`)
    }else{
    if(!req.session.userId) return res.redirect('/endSeccion')
        db.query("SELECT * from menu WHERE account_id = ?",[resturantId], (error,newResult)=>{
            if(error){
                console.log("Error while updating the quantity     "+error) 
                res.redirect('/errorPage')  
            }else{ 
                db.query("SELECT * from account WHERE id = ?",[resturantId], (error,ress)=>{
                    if(error){
                        console.log("Error while updating the quantity     "+error)
                        res.redirect('/errorPage')
                    }else{
                        db.query("SELECT * from account WHERE id = ?",[req.session.userId], (error,charityInfo)=>{
                            if(error){
                                console.log("Error while updating the quantity     "+error)
                                res.redirect('/errorPage')
                            }else{
                                res.render('viewResPage',{
                                    resdata:newResult,
                                    resName:ress[0].name,
                                    resturantId: resturantId,
                                    charityInfo: charityInfo[0],
                                    failMessage: true
                                })
                            }   
                        })
                    }
                })    
            }
        })
    }
     
})
    
module.exports = router
     

const express = require("express")
const router = express.Router()
const db = require('../config/db')

router.post("/submitOrders", async(req, res)=>{
    const chrityId = req.session.userId
    const resturantId = req.body.resturantId  
    const orders = req.body.orders.split("،")
    const menuId = req.body.menuId.split("،")
    const currentTime = new Date()  
    let frequency = [] 

    db.query("SELECT * FROM luqmataish.menu where account_id =? ", [resturantId], async(error, _result)=>{
        if(error){
            console.log("Error while retreiving menu ids     "+error)
            res.redirect(`/viewRes/page/${resturantId}`)
        }else{
            for(let i = 0; i<_result.length; i++){
                frequency.push(menuId.filter(x => x == _result[i].id).length) 
            }

            for(let i = 0; i < _result.length; i++){
                db.query("select * from luqmataish.orders where account_id =? and menu_id =?", [chrityId, _result[i].id], async(error, ordersResult)=>{
                    if(error){
                        console.log("Error while retreiving from orders     "+error)
                        res.redirect(`/viewRes/page/${resturantId}`)
                    }else{ 
                        if(ordersResult.length == 0){
                            if(frequency[i] != 0){
                                db.query("INSERT INTO `luqmataish`.`orders` (`date`, `time`, `quantity`, `account_id`, `menu_id`) VALUES (?, ?, ?, ?, ?)", [currentTime.toLocaleDateString(), currentTime.toLocaleTimeString(), frequency[i], chrityId, _result[i].id], async(error, result)=>{
                                    if(error){
                                        console.log("Error while retreiving from orders     "+error)
                                        res.redirect(`/viewRes/page/${resturantId}`)
                                    }else{
                                        db.query("UPDATE `luqmataish`.`menu` SET quantity = ? WHERE id =?",[_result[i].quantity - frequency[i], _result[i].id], (error, result)=>{
                                            if(error){
                                                console.log("Error while updating the quantity     "+error)
                                                res.redirect(`/viewRes/page/${resturantId}`)  
                                            }
                                        })
                                    }
                                })
                            }
                        }else{
                            if(frequency[i] != 0){
                                await db.query("UPDATE `luqmataish`.`orders` SET quantity = ? WHERE id =?",[ordersResult[0].quantity + frequency[i], ordersResult[0].id], (error, result)=>{
                                    if(error){
                                        console.log("Error while updating the quantity     "+error)
                                        res.redirect(`/viewRes/page/${resturantId}`)  
                                    }else{
                                        db.query("UPDATE `luqmataish`.`menu` SET quantity = ? WHERE id =?",[_result[i].quantity - frequency[i], _result[i].id], (error, result)=>{
                                            if(error){
                                                console.log("Error while updating the quantity     "+error)
                                                res.redirect(`/viewRes/page/${resturantId}`)  
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
    
    res.redirect(`/viewRes/page/${resturantId}`)
    
    /*
    db.query("SELECT * from menu WHERE account_id = ?",[resturantId], (error,newResult)=>{
            if(error){
                console.log("Error while updating the quantity     "+error)
                res.redirect(`/viewRes/page/${resturantId}`)  
            }else{ 
            db.query("SELECT * from account WHERE id = ?",[resturantId], (error,ress)=>{
                if(error){
                    console.log("Error while updating the quantity     "+error)
                    res.redirect(`/viewRes/page/${resturantId}`)  
                }else{
                    db.query("SELECT * from account WHERE id = ?",[chrityId], (error,charityInfo)=>{
                        if(error){
                            console.log("Error while updating the quantity     "+error)
                            res.redirect(`/viewRes/page/${resturantId}`)  
                        }else{
                            res.render('viewResPage',{
                                resdata:newResult,
                                resName:ress[0].name,
                                resturantId: resturantId,
                                charityInfo: charityInfo[0]
                            })
                        }   
                    })
                }
            })
        }
    })
    /*
    for(let i = 0; i < orders.length; i++){ 

                            
    await db.query("select * from luqmataish.orders where account_id =? and menu_id =?", [chrityId, menuId[i]], async(error, result)=>{
            if(error){
                console.log("Error while checking if the charity has ordered from the same category     "+error)
                res.redirect(`/viewRes/page/${resturantId}`)  
            }else{
                console.log(result.length == 0, "menu id = ",menuId[i])
                if(result.length == 0){
                    await db.query("INSERT INTO `luqmataish`.`orders` (`date`, `time`, `quantity`, `account_id`, `menu_id`) VALUES (?, ?, ?, ?, ?)", [currentTime.toLocaleDateString(), currentTime.toLocaleTimeString(), 1, chrityId, menuId[i]], async(error, result)=>{

                    })
               }else{
                    await db.query("UPDATE `luqmataish`.`orders` SET quantity = ? WHERE id =?",[result[0].quantity + 1, result[0].id], (error, result)=>{
                        if(error){
                            console.log("Error while updating the quantity     "+error)
                            res.redirect(`/viewRes/page/${resturantId}`)  
                        }else{
                            
                        }
                    })
                }
            } 
        })
    }
    */
    //res.redirect(`/viewRes/page/${resturantId}`) 

})


module.exports = router


/*
await db.query("INSERT INTO `luqmataish`.`orders` (`date`, `time`, `quantity`, `account_id`, `menu_id`) VALUES (?, ?, ?, ?, ?)", [currentTime.toLocaleDateString(), currentTime.toLocaleTimeString(), 1, chrityId, menuId[i]], async(error, result)=>{
    if(error){
        console.log("Error while inserting the order    " + error)
    }else{
        await db.query("SELECT * from `luqmataish`.`menu` WHERE id =?", [menuId[i]], async(error, result)=>{
            if(error){
                console.log("Error while      "+error)
                res.redirect(`/viewRes/page/${resturantId}`) 
            }else{
                await db.query("UPDATE `luqmataish`.`menu` SET quantity = ? WHERE id =?", [result[0].quantity - 1, menuId[i]], (error, result)=>{
                    if(error){
                        console.log("Error while checking if the charity has ordered from the same category     "+error)
                        res.redirect(`/viewRes/page/${resturantId}`)  
                    }else{
                        console.log('updated')
                    }
                })
            }
        })
    }
})
*/

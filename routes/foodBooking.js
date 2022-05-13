const express = require("express")
const router = express.Router()
const db = require('../config/db')

router.post("/submitOrders", async(req, res)=>{
    const chrityId = req.session.userId
    const resturantId = req.body.resturantId  
    const orders = req.body.orders.split("،")
    const menuId = req.body.menuId.split("،")
    const currentTime = new Date()  

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
    res.redirect(`/viewRes/page/${resturantId}`)  


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
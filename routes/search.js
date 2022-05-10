const express = require('express');
const router = express.Router();
const db = require("../config/db")
 const methodOverride = require("method-override");  
 const { render } = require('ejs');
 router.use(methodOverride("_method"))  
router.post('/edit', (req,res)=>{

})
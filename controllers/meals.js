const mysql = require("mysql");
const express = require("express");
const bcrypt = require('bcryptjs');
const app = express();
const db = require("../config/db") 
app.set("view engine", "hbs");
app.use(express.static("public"));

exports.m1 = (req, res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'وجبات رئيسية',discription:dicription,quantity:quantity,account_id:1},(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })
}

exports.m2 = (req, res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'ساندويشات',discription:dicription,quantity:quantity,account_id:1},(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })    
}

exports.m3 = (req, res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'عصائر',discription:dicription,quantity:quantity,account_id:1},(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })   
}

exports.m4 = (req, res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'حلويات',discription:dicription,quantity:quantity,account_id:1},(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })    
}

exports.m5 = (req, res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'شوربات',discription:dicription,quantity:quantity,account_id:1},(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })    
}

exports.m6 = (req, res) => {
    const dicription = req.body.discription1;
    const quantity = req.body.quantity1;
    db.query('INSERT INTO menu SET ?',{category:'وجبات سريعة',discription:dicription,quantity:quantity,account_id:1},(error,results) => {
        if(error){
            throw error;
        }else{
            console.log('insert succesfuly');
            res.render('resHomePage')
        }
    })    
}

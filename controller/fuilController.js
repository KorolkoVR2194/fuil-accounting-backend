'use strict'

const { request } = require('express')
const config =require('./../config')
const response = require('./../response')
const db = require('./../settings/db')

exports.getDicFuil = (req,res)=>{
    db.query("SELECT id_fuil,name FROM Dic_fuil",(error,rows,filds)=>{
        if (error){
            response.status(400,error,res)
        } else {
            response.status(200,rows.recordset,res)
        }
    })
    }
'use strict'


const { request } = require('express')
const config =require('./../config')
const response = require('./../response')
const db = require('./../settings/db')

exports.getAllTransport = (req,res)=>{
db.query("SELECT id_transport,marka,model,nomer FROM Dic_transport",(error,rows,filds)=>{
    if (error){
        response.status(400,error,res)
    } else {
        response.status(200,rows.recordset,res)
    }
})
}

exports.insertTransport =(req,res)=>{
    const marka = req.body.marka;
    const model = req.body.model;
    const nomer = req.body.nomer;
    db.query("INSERT INTO Dic_transport(marka,model,nomer,id_org) VALUES ('"+marka+"','"+model+"','"+nomer+"',1)",(error,rows,filds)=>{
        if (error){
            response.status(400,error,res)
        } else {
            response.status(400,rows.recordset,res)
        }
    })
}

exports.updateTransport = (req,res)=>{

}
'use strict'

const { request } = require('express')
const config =require('./../config')
const response = require('./../response')
const db = require('./../settings/db')
const jwt =require('jsonwebtoken')

exports.getDicFuil = (req,res)=>{
    const token = req.get('Authorization');
    const auth = jwt.verify(token.replace('Bearer ',''),config.JWT)

    db.query("SELECT id_fuil,name FROM Dic_fuil WHERE id_users="+auth.userId+"",(error,rows,filds)=>{
        if (error){
            response.status(400,error,res)
        } else {
            response.status(200,rows.recordset,res)
        }
    })
    }

    exports.setDicFuil = (req,res)=>{
        const token = req.get('Authorization');
        const auth = jwt.verify(token.replace('Bearer ',''),config.JWT)
        const name_fuil=req.body.name_fuil;
        db.query("SELECT id_fuil,id_users,name FROM Dic_fuil WHERE id_users="+auth.userId+" and name='"+name_fuil+"'",(error,rows,filds)=>{
            if (error){
                response.status(400,error,res)
            } else if(typeof rows !== 'undefined' && rows.recordset.length>0){
                const row = JSON.parse(JSON.stringify(rows.recordset))
                row.map(rw=>{
                response.status(302,{message:`Паливо з таким імям ${rw.name} вже існує!`},res)
                return true
            })
            } else {
                const sql ="INSERT INTO Dic_fuil (id_users,name) VALUES ('"+auth.userId+"','"+name_fuil+"')"
                console.log(sql);
                db.query(sql,(error,result)=>{
                    if (error){
                        response.status(400,error,res)
                    } else {
                        response.status(200,{message:"Паливо додано успішно!",result},res)
                    }
                })
            }
            

        })
    }

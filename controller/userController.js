'use strict'

const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const config =require('./../config')
const response = require('./../response')
const db = require('./../settings/db')

exports.getAllUsers = (req,res)=>{
db.query('SELECT id,email,date_insert FROM Users',(error,rows,fields)=>{
    if (error){
        response.status(400,error,res)
    }
    else {
        response.status(200,rows.recordset,res)
    }
});
}

exports.signup = (req,res)=>{
    db.query("SELECT id,email,password FROM Users WHERE email='"+req.body.email+"'",(error,rows,filds)=>{
      
        if (error){
            response.status(400,error,res)
        } else if(typeof rows !== 'undefined' && rows.recordset.length>0){
            const row = JSON.parse(JSON.stringify(rows.recordset))
            row.map(rw=>{
                response.status(302,{message:`Користувач з таким email =${rw.email} вже зареєстрований!`},res)
                return true
            })
        } else {
            const email = req.body.email;
            const solt = bcrypt.genSaltSync(15)
            const password = bcrypt.hashSync(req.body.password,solt);

            const sql ="INSERT INTO [Users] ([email],[password]) VALUES ('"+email+"','"+password+"')"
            db.query(sql,(error,result)=>{
                if (error){
                    response.status(400,error,res)
                } else {
                    response.status(200,{message:"Реєстрація пройшла успішно!",result},res)
                }
            })
            
        }
    })
   

}

exports.signin = (req,res)=>{
    db.query("SELECT id,email,password FROM Users WHERE email='"+req.body.email+"'",(error,rows,filds)=>{
        if (error){
            response.status(400,error,res)
        } 
        if (rows.recordset.length <= 0){
            response.status(401,{message:`Користувач з email - ${req.body.email} не зареєстрований.`},res)
        } else {
            const row = JSON.parse(JSON.stringify(rows.recordset))
            row.map(rw=>{
                const password = bcrypt.compareSync(req.body.password,rw.password)
                if (password){
                    //Якщо true OK
                    const token = jwt.sign({
                        userId:rw.id,
                        email:rw.email
                    },config.JWT,{
                        expiresIn:120*120
                    })
                    response.status(200,{token: `Bearer ${token}`},res)
                } else {
                    //Пароль невірний
                    response.status(401,{message:"Пароль не вірний."},res)
                }
                return true
            })
           
        }
    })
    /*response.status(200,'Login in',res)*/
}
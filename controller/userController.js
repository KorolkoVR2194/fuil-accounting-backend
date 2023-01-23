'use strics'

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

exports.signup = (req,res)=>{
    db.query("SELECT id,email,password FROM Users WHERE email='"+req.body.email+"'",(error,rows,filds)=>{
        response.status(200,rows.recordset,res)
      /*  if (error){
            response.status(400,error,res)
        } else if(typeof rows !== 'undefined' && rows.length>0){
            console.log(rows)
            response.status(404,'Alredy exist',res)
        } else {
            response.status(200,'Registration',res)
        }*/
    })

   }

}
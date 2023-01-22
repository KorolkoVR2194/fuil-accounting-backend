'use strics'

const response = require('./../response')
const db = require('./../settings/db')

exports.getAllUsers = (req,res)=>{
db.query('SELECT ids,email,date_insert FROM Users',(error,rows,fields)=>{
    if (error){
        response.status(400,error,res)
    }
    else {
        response.status(200,rows.recordset,res)
    }
});

exports.signup = (req,res)=>{
    const sql ="INSERT INTO Users (email,password,date_insert,date_visit,ip,browser,name_org) VALUES (``)"
}

}
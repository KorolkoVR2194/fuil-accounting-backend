const mssql = require('mssql')

const config = require('../config')

const sqlConfig = {

server:     config.SERVER,
user:       config.USER,
password:   config.PASSWORD,
database:   config.DATABASE,
options: {
    trustServerCertificate: true,
  }

}

const conection = mssql.connect(sqlConfig,(error)=>{
    if (error){
        return console.log(error); 
    } else {
        console.log('Connect OK');
    }
})



module.exports = conection
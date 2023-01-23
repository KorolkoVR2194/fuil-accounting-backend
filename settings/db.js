const mssql = require('mssql')

const env = require('./../dbenv')

const sqlConfig = {

server:     env.SERVER,
user:       env.USER,
password:   env.PASSWORD,
database:   env.DATABASE,
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
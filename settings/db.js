const mssql = require('mssql')

const sqlConfig = {

server:'localhost',
user:'userfuil',
password:'111111',
database:'db_fuil',
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
const express = require('express')
const app = express()
const port = process.env.PORT || 3600
const bodyParser = require('body-parser')
const passport = require('passport')

/*app.get('/',(req,res)=>{
    res.send('Hello from api 1111')
})*/
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use(passport.initialize())
require('./middleware/passport')(passport)


const routes = require('./settings/routes')

routes(app)

app.listen(port,()=>{
    console.log(`App listen on port ${port}`)
})
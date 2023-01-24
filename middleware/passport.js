const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const db = require('./../settings/db')
const config = require('./../config')
const options ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:config.JWT

} 

module.exports = passport =>{
    passport.use(
        new JwtStrategy(options,(payload,done)=>{
            try{
                
                db.query("SELECT id,email FROM Users WHERE id='"+payload.userId+"'",(error,rows,filds)=>{
                    if (error){
                        console.log(error)
                    } else {
                        const user = rows.recordset
                        
                        if (user){
                            done(null,user)
                        } else {
                            done(null,false)
                        }
                    } 
                })
            } catch(e){
                console.log(e)
            }
        })
    )
}
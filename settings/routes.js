'use strict'

module.exports = (app)=>{
    const usersController = require('./../controller/userController')

    app
        .route('/api/users')
        .get(usersController.getAllUsers)

    app
        .route('/api/auth/signup')
        .post(usersController.signup)

}
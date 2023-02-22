'use strict'

const { request } = require('express')

module.exports = (app)=>{
    const passport = require('passport')
    const usersController = require('./../controller/userController')
    const transportController = require('./../controller/transportController')
    const fuilController = require('./../controller/fuilController')

    app
        .route('/api/auth/signup')
        .post(usersController.signup)

    app
        .route('/api/auth/signin')
        .get(usersController.signin)
    
    app
        .route('/api/users')
        .get(passport.authenticate('jwt',{session:false}),usersController.getAllUsers)

    app
        .route('/api/dic/transport')
        .get(transportController.getAllTransport)

    app
        .route('/api/dic/fuil')
        .get(passport.authenticate('jwt',{session:false}),fuilController.getDicFuil)
        
    app
        .route('/api/dic/fuil/add')
        .post(passport.authenticate('jwt',{session:false}),fuilController.setDicFuil)




    app
        .route('/api/dic/transport/add')
        .post(transportController.insertTransport)
}
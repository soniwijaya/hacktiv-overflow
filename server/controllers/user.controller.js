const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()
const FB = require('fb')

const nodemailer = require("nodemailer");

const user = process.env.EMAIL
const pass = process.env.PASS

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: `${user}`,
    pass: `${pass}`
  }
});

module.exports = {

    registerUser ( req , res ){
        const {
            fullname,
            email,
            password
        } = req.body

        User.create(
            {
                fullname,
                email,
                password
            }
        )
        .then(userCreate => {
            let mailOptions = {
                from: `${user}`,
                to: `${email}`,
                subject: 'Thankyou for register',
                text: 'Thankyou for register'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
            })

            res.status(200).json({
                message: 'Success registration and Check Your Email',
                data: userCreate
            })
        })
        .catch(err => {
            res.status(400).json({
                message: 'Failed register',
                data: err
            })
        })

    },

    loginUser( req , res ){
        FB.setAccessToken(req.headers.token)
        FB.api('me', { fields: ['name','email','picture'] })
        .then(checkEmail => {
                console.log(checkEmail)
                User.findOne(
                    {
                        email: checkEmail.email
                    }
                )
                .then(user => {
                    if(user==null){
                        User.create(
                            {
                                fullname: checkEmail.name,
                                email: checkEmail.email,
                                password: 'facebook123'
                            }
                        )
                        .then(userCreate => {
                            const payload = {
                                id: userCreate._id,
                            }
                            let token = jwt.sign(payload, process.env.JWTSECRET)
                            res.status(200).json({
                                message: 'Success registration',
                                id: userCreate._id,
                                picture: checkEmail.picture,
                                fullname: checkEmail.name,
                                access: token
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(400).json({
                                message: 'Failed register',
                                data: err
                            })
                        })
                    }
                    else{
                        const payload = {
                            id: user._id,
                        }

                        let token = jwt.sign(payload, process.env.JWTSECRET)
                        res.status(200).json({
                            message: 'Success login',
                            id: user._id,
                            picture: checkEmail.picture,
                            fullname: checkEmail.name,
                            access: token,
                        })
                    }
                })
        })
    },

    loginManual ( req , res ){
        const {
            email,
            password
        } = req.body

            User.findOne(
                {
                    email
                }
            )
            .then(user => {
                if(user){

                    const payload = {
                        id: user._id,
                    }

                    bcrypt.compare(password,user.password)
                    .then(sign =>{
                        if(sign){
                            let token = jwt.sign(payload, process.env.JWTSECRET)
                            res.status(200).json({
                                message: 'Success login',
                                id: user._id,
                                fullname: user.fullname,
                                access: token,
                            })
                        }else{
                            res.status(400).json({
                                message: 'Email and Password doesnt match'
                            })
                        }
                    })
                }
                else{
                    res.status(400).json({
                        message: 'User not found'
                    })
                }
            })
            .catch(error => {
                res.status(400).json({
                    message: 'Login Failed'
                })
            })
    }

}
const jwt = require('jsonwebtoken')
const env = require('dotenv').config()

module.exports = {
    authentication (req, res, next){
        const { 
            apptoken,
            id
        } = req.headers

        jwt.verify(apptoken, process.env.JWTSECRET, (err) => {
            if(err){
                return res.status(403).json({
                    message: 'Invalid token'
                })
            }else{
                const status = jwt.decode(apptoken, process.env.JWTSECRET)
                if(status.id==id){
                    next()
                }else{
                    return res.status(200).json({
                        message: 'Your access id not accept'
                    })
                }
            }
        })
    }
}
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')

let schemaUser = new Schema(
    {
        fullname: {
            type: String,
            required: [true, 'column must be filled'],
        },
        email: {
            type: String,
            required: [true, 'column must be filled'],
            unique: [true, 'email not be same'],
            validate:{
                isAsync:true,
                validator:(email,callback)=>{
                    let cekEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm
                    callback(cekEmail.test(email),'wrong format email' )
                }
            }
        },
        password: {
            type: String,
            required: [true, 'column must be filled'],
            minlength: 6,
            validate: {
                validator: function(password) {
                    return /\d/.test(password) && /[a-zA-Z]/.test(password)
                },
                message: 'password min 6 and combine with number',
            }
        },
        questions: [{type: Schema.Types.ObjectId, ref:'question'}],
        answers: [{type: Schema.Types.ObjectId, ref:'answer'}]
    },{
        timestamps:true
    }
)
schemaUser.pre('save', function(next) {

    if(this.password==''){
        next()
    }else{
        let ps = this
        bcrypt.hash(ps.password,bcrypt.genSaltSync(), function(err, passwordHash){
            if(err){
                console.log(err)
            }else{
                ps.password = passwordHash
                next()
            }
        })
    }
})

let Users = mongoose.model('user', schemaUser)

module.exports = Users
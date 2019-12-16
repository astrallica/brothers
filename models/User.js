const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const uniqueValidator = require("mongoose-unique-validator")
const secret = 'sceret' // TODO: ask PG , does this constant being set to process.env.NODE_ENV === "production" ? process.env.SECRET : 'secret' mean environment variables are set somewhere on the server which acts as private key?

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  nickname: { type: String, required: true, unique: true }, 
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  dia: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  isActivated: { type: Boolean, default: true }
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, { message: "이미 존재하는 계정 입니다." })

UserSchema.methods.generateJWT = function() {
  let today = new Date()
  let exp = new Date(today)
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    id: this._id,
    email: this.email,
    exp: parseInt(exp.getTime() / 1000),
  },
  secret)
}


const User = mongoose.model("User", UserSchema)
module.exports = User

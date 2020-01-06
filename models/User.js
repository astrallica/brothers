const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const uniqueValidator = require("mongoose-unique-validator")
const secret = 'sceret' 

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  udid: { type: String, required: true },
  token: { type: String },
  profileUrl: {type: String, default: ""},
  gold: { type: Number, default: 0 },
  dia: { type: Number, default: 0 },
  coupon1: { type: Number, default: 0 },
  coupon2: { type: Number, default: 0 },
  coupon3: { type: Number, default: 0 },
  coupon4: { type: Number, default: 0 },
  arbeitNoti: { type: Boolean, default: false},
  mailNoti: { type: Boolean, default: false},
  coupon4: { type: Number, default: 0 },
  lastLogin: { type: Date }
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

const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const uniqueValidator = require("mongoose-unique-validator")
const secret = 'sceret' 

const UserAccountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  accountType: { type: Number, default: 0 },
  email: { type: String, required: true },
  accountKey1: { type: String },
  accountKey2: { type: String },
}, {timestamps: true})

UserAccountSchema.plugin(uniqueValidator, { message: "이미 존재하는 계정 입니다." })

const UserAccount = mongoose.model("UserAccount", UserAccountSchema)
module.exports = UserAccount

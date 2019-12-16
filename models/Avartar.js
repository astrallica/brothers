const mongoose = require("mongoose")
const User = require("./User")
const Inventory = require("./Inventory")

const AvatarSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: Inventory, required: true },
  star: { type: Number, default: 1 },
  level: { type: Number, default: 1 },
  upgrade: { type: Number, default: 0 },
  isActivated: { type: Boolean, default: true }
})

const Avatar = mongoose.model("Avatar", AvatarSchema)
module.exports = Avatar

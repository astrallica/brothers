const mongoose = require("mongoose")
const User = require("./User")
const Item = require("./Item")

const InventorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: Item, required: true },
  fp: { type: Number, default: 1 },
  isActivated: { type: Boolean, default: true }
})

const Inventory = mongoose.model("Inventory", InventorySchema)
module.exports = Inventory

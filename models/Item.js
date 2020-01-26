const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
  costType: { type: Number, default: 0 },
  cost: { type: Number, default: 0 },
  fp: { type: Number, default: 0 },
  fileName: { type: String, required: true },
  category: [ Number ],
  left: { type: Number, default: "0" },
  bottom: { type: Number, default: "0" }
})

const Item = mongoose.model("Item", ItemSchema)
module.exports = Item

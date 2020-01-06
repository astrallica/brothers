const mongoose = require("mongoose")
const User = require("./User")

const ArbeitSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  name: { type: String, required: true },
  hairId: { type: String, default: "0" },
  hairColor: { type: Number, default: 0 },
  wearing: [ String ],
  fp: { type: Number, default: "0" }
})

const Arbeit = mongoose.model("Arbeit", ArbeitSchema)
module.exports = Arbeit

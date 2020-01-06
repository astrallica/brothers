const mongoose = require("mongoose")
const User = require("./User")
const Balloon = require("./Balloon")

const StickerSchema = new mongoose.Sechma({
  stickerId: String,
const DecorationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  BalloonId: { type: mongoose.Schema.Types.ObjectId, ref: Balloon, required: true },
  balloonText: { type: String, defalut: "" },
  sitckers: [ 
  hairId: { type: String, default: "0" },
  hairColor: { type: Number, default: 0 },
  wearing: [ String ],
  fp: { type: Number, default: "0" }
})

const Decoration = mongoose.model("Decoration", DecorationSchema)
module.exports = Decoration

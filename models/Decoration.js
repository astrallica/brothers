const mongoose = require("mongoose")
const User = require("./User")
const Balloon = require("./Balloon")

const StickerSchema = new mongoose.Sechma({
  stickerId: { type: String, default: "0" },
  positionX: { type: Number, default: 0 },
  positionY: { type: Number, default: 0 }
})

const DecorationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  Balloon: { 
    balloonId: { type: mongoose.Schema.Types.ObjectId, ref: Balloon, required: true },
    balloonText: { type: String, defalut: "" },
    positionX: { type: Number, default: 0 },
    positionY: { type: Number, default: 0 },  
    scaleX: { type: Number, default: 0 },
    scaleY: { type: Number, default: 0 } 
  },
  sitckers: [ StickerSchema ],
  hairId: { type: String, default: "0" },
  hairColor: { type: Number, default: 0 },
  wearing: [ String ],
  fp: { type: Number, default: "0" }
})

const Decoration = mongoose.model("Decoration", DecorationSchema)
module.exports = Decoration

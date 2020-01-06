const mongoose = require("mongoose")

const StickerSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
})

const Sticker = mongoose.model("Sticker", StickerSchema)
module.exports = Sticker

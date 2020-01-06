const mongoose = require("mongoose")

const HairSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
})

const Hair = mongoose.model("Hair", HairSchema)
module.exports = Hair

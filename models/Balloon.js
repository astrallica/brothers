const mongoose = require("mongoose")

const BalloonSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
})

const Balloon = mongoose.model("Balloon", BalloonSchema)
module.exports = Balloon

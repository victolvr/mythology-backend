const mongoose = require("mongoose")

const demigodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: "God", required: true },
})

const Demigod = mongoose.model("Demigod", demigodSchema)

module.exports = Demigod

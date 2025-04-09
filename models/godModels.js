const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const godSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String, enum: ["admin", "god"], required: true },
})

// Middleware para criptografar senha antes de salvar
godSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const God = mongoose.model("God", godSchema)

module.exports = God


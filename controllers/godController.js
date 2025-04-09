const God = require("../models/godModels")
const bcrypt = require("bcryptjs")

// Criar novo deus
exports.createGod = async (req, res) => {
  try {
    const { name, password, profile } = req.body
    const god = new God({ name, password, profile })
    await god.save()
    res.status(201).json(god)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar todos os deuses
exports.getGods = async (req, res) => {
  try {
    const gods = await God.find()
    res.status(200).json(gods)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Buscar um deus específico por ID
exports.getGodById = async (req, res) => {
  try {
    const god = await God.findById(req.params.id)
    if (!god) {
      return res.status(404).json({ message: "Deus não encontrado" })
    }
    res.status(200).json(god)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Fazer login
exports.login = async (req, res) => {
  const { name, password } = req.body
  try {
    const god = await God.findOne({ name })
    if (!god) return res.status(400).json({ message: "Deus não encontrado" })

    const isMatch = await bcrypt.compare(password, god.password)
    if (!isMatch) return res.status(400).json({ message: "Senha incorreta" })

    res.status(200).json({ message: "Login bem-sucedido", god })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Atualizar deus
exports.updateGod = async (req, res) => {
  try {
    const { id } = req.params
    const { name, password, profile } = req.body

    const updatedGod = await God.findByIdAndUpdate(id, { name, password, profile }, { new: true })
    if (!updatedGod) return res.status(404).json({ message: "Deus não encontrado" })

    res.status(200).json(updatedGod)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Excluir deus
exports.deleteGod = async (req, res) => {
  try {
    const { id } = req.params
    const deletedGod = await God.findByIdAndDelete(id)
    if (!deletedGod) return res.status(404).json({ message: "Deus não encontrado" })

    res.status(200).json({ message: "Deus excluído com sucesso" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
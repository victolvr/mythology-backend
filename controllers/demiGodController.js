const Demigod = require("../models/demiGodModels")

// Criar novo semideus
exports.createDemigod = async (req, res) => {
  try {
    const { name, description, parent } = req.body
    const demigod = new Demigod({ name, description, parent })
    await demigod.save()
    res.status(201).json(demigod)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar todos os semideuses
exports.getDemigods = async (req, res) => {
  try {
    const demigods = await Demigod.find().populate("parent", "name")
    res.status(200).json(demigods)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Buscar um semideus específico por ID
exports.getDemigodById = async (req, res) => {
  try {
    const demigod = await Demigod.findById(req.params.id).populate("parent", "name")
    if (!demigod) {
      return res.status(404).json({ message: "Semideus não encontrado" })
    }
    res.status(200).json(demigod)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Atualizar semideus
exports.updateDemigod = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, parent } = req.body

    const updatedDemigod = await Demigod.findByIdAndUpdate(id, { name, description, parent }, { new: true })
    if (!updatedDemigod) return res.status(404).json({ message: "Semideus não encontrado" })

    res.status(200).json(updatedDemigod)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Excluir semideus
exports.deleteDemigod = async (req, res) => {
  try {
    const { id } = req.params
    const deletedDemigod = await Demigod.findByIdAndDelete(id)
    if (!deletedDemigod) return res.status(404).json({ message: "Semideus não encontrado" })

    res.status(200).json({ message: "Semideus excluído com sucesso" })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Listar semideuses por deus pai
exports.getDemigodsByGod = async (req, res) => {
  try {
    const { godId } = req.params
    const demigods = await Demigod.find({ parent: godId }).populate("parent", "name")
    res.status(200).json(demigods)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

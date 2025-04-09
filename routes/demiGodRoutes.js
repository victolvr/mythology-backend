const express = require("express")
const router = express.Router()
const {
  createDemigod,
  getDemigods,
  updateDemigod,
  deleteDemigod,
  getDemigodById,
  getDemigodsByGod,
} = require("../controllers/demiGodController")

// Rotas de semideuses
router.post("/", createDemigod)
router.get("/", getDemigods)
router.get("/:id", getDemigodById)
router.put("/:id", updateDemigod)
router.delete("/:id", deleteDemigod)
router.get("/god/:godId", getDemigodsByGod) // Rota para listar semideuses por deus pai

module.exports = router

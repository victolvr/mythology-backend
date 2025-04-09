const express = require("express")
const router = express.Router()
const { createGod, getGods, login, updateGod, deleteGod, getGodById } = require("../controllers/godController")

// Rotas de deuses
router.post("/", createGod)
router.get("/", getGods)
router.get("/:id", getGodById)
router.post("/login", login)
router.put("/:id", updateGod)
router.delete("/:id", deleteGod)

module.exports = router


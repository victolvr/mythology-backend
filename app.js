const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const godRoutes = require("./routes/godRoutes")
const demigodRoutes = require("./routes/demiGodRoutes")
const app = express()
const PORT = process.env.PORT || 3000

// Middleware para parse de JSON
app.use(express.json())

app.use(cors())

// Conectando ao MongoDB
mongoose
  .connect("mongodb+srv://pvictorolv1:Jesus10@cluster0.9cscxze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado ao MongoDB!")
  })
  .catch((err) => {
    console.log("Erro ao conectar ao MongoDB:", err)
  })

// Usando rotas
app.use("/api/gods", godRoutes)
app.use("/api/demigods", demigodRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})

const express = require('express')
const app = express()
const PORT = 8000
const routes = require('./routes')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://daniel-dantas:deiniel123@mydb-gdwir.mongodb.net/omni10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.get('/', (req,res) => {
  res.json({message: 'API REST'})
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
import 'dotenv/config'
import express from 'express'
import authRouter from './routes/auth'
import usuarioRouter from './routes/usuario'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/auth', authRouter)

app.use('/usuarios', usuarioRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
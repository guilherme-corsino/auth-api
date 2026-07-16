import 'dotenv/config'
import express from 'express'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import authRouter from './routes/auth'
import usuarioRouter from './routes/usuario'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser())


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/auth', authRouter)
app.use('/usuarios', usuarioRouter)

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
    console.log(`Documentação: http://localhost:${PORT}/docs`)
})
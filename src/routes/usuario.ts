import { Router } from 'express'
import { autenticar, AuthRequest } from '../middlewares/auth'

const router = Router()

router.get('/me', autenticar, (req: AuthRequest, res) => {
    res.json({ usuario: req.usuario })
})

export default router
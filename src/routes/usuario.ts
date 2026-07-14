import { Router } from 'express'
import { autenticar, AuthRequest } from '../middlewares/auth'
import { autorizar } from '../middlewares/role'
import prisma from '../database/prisma'

const router = Router()

router.get('/me', autenticar, (req: AuthRequest, res) => {
    res.json({ usuario: req.usuario })
})

// só admin acessa
router.get('/', autenticar, autorizar('ADMIN'), async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        select: { id: true, nome: true, email: true, role: true, createdAt: true }
    })
    res.json(usuarios)
})

export default router
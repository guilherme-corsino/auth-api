import { Request, Response } from 'express'
import { authService } from '../services/authService'

export const authController = {
    async register(req: Request, res: Response) {
        try {
            const { nome, email, senha } = req.body
            const usuario = await authService.register(nome, email, senha)
            res.status(201).json(usuario)
        } catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body
            const resultado = await authService.login(email, senha)
            res.json(resultado)
        } catch (error: any) {
            res.status(401).json({ message: error.message })
        }
    },
    async refresh(req: Request, res: Response) {
        try {
            const { refreshToken } = req.body
            const resultado = await authService.refresh(refreshToken)
            res.json(resultado)
        } catch (error: any) {
            res.status(401).json({ message: error.message })
        }
    }
}
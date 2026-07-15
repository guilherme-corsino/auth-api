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

            // refresh token vai no cookie HttpOnly
            res.cookie('refreshToken', resultado.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
            })

            // retorna só o access token e dados do usuário
            res.json({
                accessToken: resultado.accessToken,
                usuario: resultado.usuario
            })
        } catch (error: any) {
            res.status(401).json({ message: error.message })
        }
    },
    async refresh(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken // vem do cookie
            const resultado = await authService.refresh(refreshToken)
            res.json(resultado)
        } catch (error: any) {
            res.status(401).json({ message: error.message })
        }
    },
    async logout(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refreshToken

            if (refreshToken) {
                // remove o refresh token do banco
                await authService.logout(refreshToken)
            }

            // limpa o cookie
            res.clearCookie('refreshToken')
            res.json({ message: 'Logout realizado com sucesso' })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}
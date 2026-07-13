import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface AuthRequest extends Request {
    usuario?: {
        id: number
        email: string
        role: string
    }
}

export function autenticar(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não fornecido' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
            id: number
            email: string
            role: string
        }

        req.usuario = payload
        next()
    } catch {
        return res.status(401).json({ message: 'Token inválido ou expirado' })
    }
}
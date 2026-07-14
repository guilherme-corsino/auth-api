import { Response, NextFunction } from 'express'
import { AuthRequest } from './auth'

export function autorizar(...roles: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.usuario) {
            return res.status(401).json({ message: 'Não autenticado' })
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(403).json({ message: 'Acesso negado' })
        }

        next()
    }
}
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../database/prisma'

export const authService = {
    async register(nome: string, email: string, senha: string) {
        const usuarioExiste = await prisma.usuario.findUnique({ where: { email } })
        if (usuarioExiste) throw new Error('Email já cadastrado')

        const senhaHash = await bcrypt.hash(senha, 10)
        const usuario = await prisma.usuario.create({
            data: { nome, email, senha: senhaHash }
        })

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role,
            createdAt: usuario.createdAt
        }
    },
    async login(email: string, senha: string) {
        const usuario = await prisma.usuario.findUnique({ where: { email } })
        if (!usuario) throw new Error('Credenciais inválidas')

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) throw new Error('Credenciais inválidas')

        // access token — curto
        const accessToken = jwt.sign(
            { id: usuario.id, email: usuario.email, role: usuario.role },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        )

        // refresh token — longo
        const refreshToken = jwt.sign(
            { id: usuario.id },
            process.env.JWT_SECRET!,
            { expiresIn: '7d' }
        )

        // salva o refresh token no banco
        await prisma.usuario.update({
            where: { id: usuario.id },
            data: { refreshToken }
        })

        return {
            accessToken,
            refreshToken,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            }
        }
    },
    async refresh(refreshToken: string) {
        if (!refreshToken) throw new Error('Refresh token não fornecido')

        // verifica se o token é válido
        const payload = jwt.verify(refreshToken, process.env.JWT_SECRET!) as { id: number }

        // busca o usuário e verifica se o refresh token bate com o do banco
        const usuario = await prisma.usuario.findUnique({ where: { id: payload.id } })

        if (!usuario || usuario.refreshToken !== refreshToken) {
            throw new Error('Refresh token inválido')
        }

        // gera novo access token
        const accessToken = jwt.sign(
            { id: usuario.id, email: usuario.email, role: usuario.role },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        )

        return { accessToken }
    }
}
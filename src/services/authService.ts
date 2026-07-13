import bcrypt from 'bcryptjs'
import prisma from '../database/prisma'

export const authService = {
    async register(nome: string, email: string, senha: string) {

        const usuarioExiste = await prisma.usuario.findUnique({
            where: { email }
        })

        if (usuarioExiste) {
            throw new Error('Email já cadastrado')
        }

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
    }
}
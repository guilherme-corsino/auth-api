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
        // busca o usuário
        const usuario = await prisma.usuario.findUnique({ where: { email } })

        // mesma mensagem pra email errado e senha errada — segurança
        if (!usuario) throw new Error('Credenciais inválidas')

        // compara senha com hash
        const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
        if (!senhaCorreta) throw new Error('Credenciais inválidas')

        // gera o JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, role: usuario.role },
            process.env.JWT_SECRET!,
            { expiresIn: '15m' }
        )

        return {
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role
            }
        }
    }
}
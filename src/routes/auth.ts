import { Router } from 'express'
import { authController } from '../controllers/authController'
import { validate } from '../middlewares/validate'
import { registerSchema, loginSchema } from '../schemas/authSchema'

const router = Router()

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, email, senha]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Guilherme Corsino
 *               email:
 *                 type: string
 *                 example: gui@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou email já cadastrado
 */
router.post('/register', validate(registerSchema), authController.register)

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login e geração de token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: gui@email.com
 *               senha:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', validate(loginSchema), authController.login)

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Renovar access token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Novo access token gerado
 *       401:
 *         description: Refresh token inválido
 */
router.post('/refresh', authController.refresh)

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 */
router.post('/logout', authController.logout)

export default router
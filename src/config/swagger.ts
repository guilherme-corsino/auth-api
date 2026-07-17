import swaggerJsdoc from 'swagger-jsdoc'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'API de autenticação com JWT, refresh token e roles',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        servers: [
            {
                url: 'https://zippy-enchantment-production-dce7.up.railway.app',
                description: 'Servidor de produção',
            },
            {
                url: 'http://localhost:3000',
                description: 'Servidor local',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)
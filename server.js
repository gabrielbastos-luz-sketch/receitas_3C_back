import Fastify from 'fastify'

const server = Fastify()

server.get('/usuarios', () => {
    return "IT'S ALIVE"
})

server.listen({port:3000})
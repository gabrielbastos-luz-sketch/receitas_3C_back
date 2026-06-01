import Fastify from 'fastify'
    import { Pool } from 'pg'
    import cors from '@fastify/cors'

const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'receitas'
})

const server = Fastify()
server.register(cors, {
    origin: '*'
})

server.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuario')
    return resultado.rows
})

server.post('/usuarios', async (request, reply)=>{
    const nome = request.body.nome
    const email = request.body.email
    const senha = request.body.senha
    const resultado = await sql.query('insert into usuario (nome, email, senha) values ($1, $2, $3)', [nome, email, senha])
    reply.status(201).send({masage: "funfo"})
})

server.put('/usuarios/:id', async (request, reply)=>{
    const body = request.body
    const id = request.params.id
    const resultado = await sql.query('update usuario set nome = $1, senha = $2 where id = $3', [body.nome, body.senha, id])
    return 'cagada feita'
})

server.delete('/usuarios/:id', async (request, reply)=>{
    const id = request.params.id
    const resultado = await sql.query('delete from usuario where id = $1', [id])
    reply.status(204)
})

server.post('/login', async (request, reply) => {
    const body = request.body;
    const resultado = await sql.query('select * from usuario where email = $1 AND senha = $2', [body.email, body.senha])     


    if (resultado.rows.length === 0) {
        return reply.status(401).send({error: 'email ou senha inválidos!'})
    }


    reply.status(200).send({mensagem: "login realizado com sucesso!", ok: true})
})
server.listen({port:3000})
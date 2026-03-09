import Fastify from 'fastify'
    import { Pool } from 'pg'

const sql = new Pool({
    user: 'postgres',
    password: 'senai',
    host: 'localhost',
    port: 5432,
    database: 'receitas'
})

const server = Fastify()

server.get('/usuarios', async () => {
    const resultado = await sql.query('select * from users')
    return resultado.rows
})

server.post('/usuarios', async (request, reply)=>{
    const nome = request.body.nome
    const senha = request.body.senha
    const resultado = await sql.query('insert into users (nome, senha) values ($1, $2)', [nome, senha])
    reply.status(201).send({masage: "funfo"})
})

server.put('/usuarios/:id', async (request, reply)=>{
    const body = request.body
    const id = request.params.id
    const resultado = await sql.query('update users set nome = $1, senha = $2 where id = $3', [body.nome, body.senha, id])
    return 'cagada feita'
})

server.delete('/usuarios/:id', async (request, reply)=>{
    const id = request.params.id
    const resultado = await sql.query('delete from users where id = $1', [id])
    reply.status(204)
})

server.listen({port:3000})
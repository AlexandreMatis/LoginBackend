import express from 'express'
import cors from 'cors'

const app = express()
const port = 4000

const users = [
    {
        email: 'alexandrematis@gmail.com',
        password: '1234567890',
        block: 0
    }
]

app.use(express.json())
app.use(cors())

app.get('/users', (req, res) => res.send(users))

app.post('/create', (req, res) => {
    const user = req.body
    user.blocked = false
    users.push(user)
    res.send('usuário criado com sucesso')
})

app.post('/verify', (req, res) => {
    const userReq = req.body
    const userExists = users.find(u => u.email === userReq.email)
    const userIndex = users.findIndex(u => u.email === userReq.email)

    if (userExists) {
        var usuario = 'usuário encontrado'

        if (userExists.block >= 3) {
            var bloqueado = 'usuário bloqueado'
        }

        if (userReq.password === userExists.password) {
            var senha = 'senha correta'
        } else {
            var senha = 'senha incorreta'
            users[userIndex].block++
            console.log(users[userIndex].block)
        }

    } else {
        var usuario = 'usuário não encontrado'
    }
res.send({ usuario, senha, bloqueado })
})

app.listen(port, () => {
    console.log(`backend is running on port ${port}`)
})

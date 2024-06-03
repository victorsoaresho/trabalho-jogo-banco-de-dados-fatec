const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const cors = require('cors');

app.use(cors());
app.use(express.json());

let estadoPersonagens = {
    heroi: { vida: 100 },
    vilao: { vida: 100 }
};

app.get('/characters', (req, res) => {
    res.json(estadoPersonagens);
});

app.post('/atualizarVida', (req, res) => {
    const { vidaHeroi, vidaVilao } = req.body;
    estadoPersonagens.heroi.vida = vidaHeroi;
    estadoPersonagens.vilao.vida = vidaVilao;

    io.emit('atualizarVida', { vidaHeroi, vidaVilao });
    res.status(200).send('Vida atualizada com sucesso.');
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

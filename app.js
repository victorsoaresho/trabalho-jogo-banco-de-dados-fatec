const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  connectionString: process.env.DATABASE_URL || "postgres://victor2412:QiDhrNKcMQ1F0m4UlqqQVMtywE0XffjE@dpg-cpejo7n109ks73fbohmg-a.oregon-postgres.render.com/jogo",
  ssl: {
    rejectUnauthorized: false
  }
};
const pool = new Pool(dbConfig);

// Endpoint de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login bem-sucedido' });
    } else {
      res.json({ success: false, message: 'Usuário não encontrado ou senha incorreta' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

// Endpoint de registro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    await pool.query('INSERT INTO usuarios (email, senha) VALUES ($1, $2)', [email, password]);
    res.json({ success: true, message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

// Endpoint para iniciar a partida
app.post('/iniciarPartida', async (req, res) => {
  const { vidaHeroi, vidaVilao, ultimaAcao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO jogo (vida_heroi, vida_vilao, ultima_acoa) VALUES ($1, $2, $3) RETURNING id',
      [vidaHeroi, vidaVilao, ultimaAcao]
    );
    const partidaId = result.rows[0].id;
    res.status(200).json({ success: true, partidaId: partidaId, message: 'Partida iniciada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao iniciar a partida.');
  }
});

// Endpoint para atualizar a vida dos personagens
app.post('/atualizarVida', async (req, res) => {
  const { partidaId, vidaHeroi, vidaVilao, ultimaAcao } = req.body;
  try {
    await pool.query(
      'UPDATE jogo SET vida_heroi = $1, vida_vilao = $2, ultima_acoa = $3 WHERE id = $4',
      [vidaHeroi, vidaVilao, ultimaAcao, partidaId]
    );
    res.status(200).send('Vida atualizada com sucesso.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar a vida.');
  }
});

// Endpoint para deletar todas as linhas da tabela jogo
app.delete('/deletarPartida', async (req, res) => {
  try {
    await pool.query('DELETE FROM jogo');
    res.status(200).send('Todas as partidas deletadas com sucesso.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao deletar as partidas.');
  }
});

// Endpoint para obter os dados da última ação
app.get('/ultimaAcao', async (req, res) => {
  try {
    const result = await pool.query('SELECT vida_heroi, vida_vilao, ultima_acoa FROM jogo ORDER BY id DESC LIMIT 1');
    if (result.rows.length > 0) {
      const ultimaAcao = result.rows[0];
      res.json({
        success: true,
        vidaHeroi: ultimaAcao.vida_heroi,
        vidaVilao: ultimaAcao.vida_vilao,
        ultimaAcao: ultimaAcao.ultima_acoa
      });
    } else {
      res.json({ success: false, message: 'Nenhuma ação encontrada.' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

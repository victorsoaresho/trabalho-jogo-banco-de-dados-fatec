const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  connectionString: "postgres://victor2412:QiDhrNKcMQ1F0m4UlqqQVMtywE0XffjE@dpg-cpejo7n109ks73fbohmg-a.oregon-postgres.render.com/jogo",
  ssl: {
    rejectUnauthorized: false
  }
};
const pool = new Pool(dbConfig);

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

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    await pool.query('INSERT INTO usuarios (email, senha) VALUES ($1, $2)', [email, password]);
    res.json({ success: true, message: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro no servidor' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

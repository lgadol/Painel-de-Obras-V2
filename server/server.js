const express = require('express');
const cors = require('cors');
const app = express();
const { createConnection } = require('mysql');

app.use(cors());

const painelDeObras2CONN = createConnection({
  host: '10.54.0.136',
  user: 'pedro',
  password: 'pedro',
  database: 'painel_de_obras2'
});

const comumCONN = createConnection({
  host: '10.54.0.136',
  user: 'pedro',
  password: 'pedro',
  database: 'comum'
});

/* Conexões painel_de_obras2 */
app.get('/obras', (req, res) => {
  /*   const queryObject = url.parse(req.url, true).query;
    console.log(queryObject); */
  painelDeObras2CONN.query('SELECT * FROM _obras', (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/pedidos/:id', (req, res) => {
  const { id } = req.params;
  painelDeObras2CONN.query("SELECT * FROM _pedidos WHERE pedido LIKE CONCAT('%',?,'%')", [id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/peps/:id', (req, res) => {
  const { id } = req.params;
  painelDeObras2CONN.query("SELECT * FROM _peps WHERE pep LIKE CONCAT('%',?,'%')", [id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/pecas/:id', (req, res) => {
  const { id } = req.params;
  painelDeObras2CONN.query("SELECT * FROM pecas WHERE pep LIKE CONCAT('%',?,'%')", [id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.get('/login', (req, res) => {
  const loginData = {
    username: 'usuário',
    password: 'senha'
  };
  res.json(loginData);
});

/* Conexões comum */
app.get('/cronograma/:id', (req, res) => {
  const { id } = req.params;
  comumCONN.query("SELECT * FROM _cronograma WHERE pep LIKE CONCAT('%',?,'%')", [id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

/* Servidor rodando */
app.listen(4000, () => {
  console.log('API listening on port 4000');
});
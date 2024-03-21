const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
});

connection.connect();

app.get('/', (req, res) => {
  const name = `Visitante_${Date.now()}`;
  connection.query(`INSERT INTO people (name) VALUES ('${name}')`, (err) => {
    if (err) throw err;
    connection.query('SELECT name FROM people', (err, results) => {
      if (err) throw err;
      res.send('<h1>Full Cycle Rocks!</h1>' + results.map(person => `<p>${person.name}</p>`).join(''));
    });
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.info("Interrupted");
  connection.end();
  process.exit(0);
});
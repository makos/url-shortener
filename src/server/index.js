const process = require('process');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3001;

const config = require('./config.js');

/* TODO: Config file with all those things inside environment variables. */
const connection = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db
});

connection.connect();

app.use(express.json());

app.get('/:urlId', (req, res) => {
  connection.query(
    'SELECT * FROM URLS WHERE ID = ?',
    [req.params.urlId],
    (err, result, fields) => {
      if (err) throw err;

      const hasUrl = result.length;
      res
        .status(hasUrl ? 200 : 404)
        .json(hasUrl ? result[0].longLink : {status: "No URL with given ID."});
    });
});

app.post('/', (req, res) => {
  console.log("Received request with body: ", req.body);
  connection.query(
    'INSERT INTO URLS SET ?',
    [req.body],
    (err, result, fields) => {
      if (err) throw err;
      res.status(200).json({shortLink: `myshorter.com/${result.insertId}`});
    }
  );
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}.`);
});

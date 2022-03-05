import process from 'process';

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const mysql = require('mysql');

/* TODO: Config file with all those things inside environment variables. */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'shorter',
  password: 'strongpass',
  database: 'SHORTER'
});

connection.connect();

app.use(express.json());

app.get('/:urlId', (req, res) => {
  connection.query(
    'SELECT * FROM URLS WHERE ID = ?',
    [req.params.urlId],
    (err, result, fields) => {
      if (err) throw err;

      console.log("Result:", result);

      const hasUrl = result.length;
      res
        .status(hasUrl ? 200 : 404)
        .json(hasUrl ? result[0].URL : {status: "No URL with given ID."});
    });
});

app.post('/', (req, res) => {
  console.log("Received request with body: ", req.body);
  connection.query(
    'INSERT INTO URLS (URL) VALUES (?)',
    [req.body.longLink],
    (err, result, fields) => {
      if (err) throw err;

      console.log("Result:", result);
      
      res.status(200).json({shortLink: `myshorter.com/${result.insertId}`});
    }
  );
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}.`);
});

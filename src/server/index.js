const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');

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

      if (result[0]) {
        res.status(200).json(result[0].URL);
      } else {
        res.status(404).json({status: "No URL with given ID."});
      }
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
      console.log("ID: ", result.insertId);
      
      res.status(200).json({shortLink: `myshorter.com/${result.insertId}`});
    }
  );
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}.`);
});

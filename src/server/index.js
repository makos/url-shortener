const process = require('process');
const express = require('express');
const mysql = require('mysql');
const app = express();
const uri = require('node-uri');
const port = process.env.PORT || 3001;

const config = require('./config.js');

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
      /* TODO: URL checking; don't try to redirect to invalid HTTP address!
         Maybe only need to be checked in the POST route? If it passes there we
         can assume it's valid here. */
      if (hasUrl) {
        res.redirect(301, result[0].longLink);
      } else {
        res4.status(404).json({status: 'No URL with given ID.'});
      }
    });
});

app.post('/', (req, res) => {
  /* TODO: Remove console logging after dev. */
  console.log('Received request with body:' , req.body);
  /* TODO: URL validation; has the user sent in a valid URL? */
  connection.query(
    'INSERT INTO URLS SET ?',
    [req.body],
    (err, result, fields) => {
      /* TODO: Error handling. */
      if (err) throw err;
      /* TODO: Dev / debug stuff. */
      
      res.status(200).json({shortLink: `${req.hostname}/${result.insertId}`});
    }
  );
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}.`);
});

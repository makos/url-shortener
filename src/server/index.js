const express = require('express');
const mysql = require('mysql');
const app = express();
const uri = require('node-uri');
const base62 = require('base62/lib/ascii');

const config = require('./config.js');

const connection = mysql.createConnection({
  host: config.db_host,
  user: config.db_user,
  password: config.db_password,
  database: config.db
});

connection.connect();

app.use(express.json());

/* Quick debug "logger". */
// app.use((req, res, next) => {
//   console.log(req.body);
//   next();
// });

app.get('/:urlId', (req, res) => {
  /* MariaDB SQL queries via mysql module. */
  /* TODO: Move this out into separate file. */
  const decoded = base62.decode(req.params.urlId);
  
  connection.query(
    'SELECT * FROM URLS WHERE ID = ?',
    [decoded],
    (err, result, fields) => {
      if (err) {
        res.status(500).json({shortLink: 'Server error. Please try again.'});
        return;
      }
      /* The query returns an array even if there's no records. Check if the
         array has any members (should only ever have one because we use unique 
         primary keys) and then act accordingly. */
      const hasUrl = result.length;
      if (hasUrl) {
        res.redirect(301, result[0].longLink);
      } else {
        res.status(404).json({status: 'No URL with given ID.'});
      }
    });
});

app.post('/', (req, res) => {
  /* Validate the URL with node-uri. */
  try {
    uri.checkWebURL(req.body.longLink);
  } catch (uriError) {
    res.status(400).end();
    return;
  }
  /* MariaDB SQL queries via mysql module. */
  /* TODO: Move this out into separate file. */  
  connection.query(
    'INSERT INTO URLS SET ?',
    [req.body],
    (err, result, fields) => {
      /* Error handling. */
      if (err) {
        res.status(500).end();
        return;
      }

      /* Some QoL for development, add port to the displayed link for easier
         checking. TODO: remove in production. */
      let port = ''
      if (app.get('env') === 'development') {
        port = ':3001';
      }

      /* Probably expensie to encode every time a query is made; but for
         low user count should be fine. Later can move this into the database. */
      const encoded = base62.encode(result.insertId);
      
      res.status(200).json({shortLink: `${req.hostname}${port}/${encoded}`});
    }
  );
});

app.listen(config.port, () => {
  console.log(`Backend listening on port ${config.port}.`);
});

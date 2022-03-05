const express = require('express');
const app = express();
const port = 3001;

const calcId = function (req, res, next) {
  req.newId = 1;
  next();
}

app.use(express.json());
app.use(calcId);

app.get('/:urlId', (req, res) => {
  res.send(res.json({url: req.params.urlId}));
});

app.post('/', (req, res) => {
  console.log("Received request with body: ", req.body);
  res.status(200).json({shortLink: `myshorter.com/${req.newId}`});
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}.`);
});

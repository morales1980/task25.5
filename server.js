const express = require('express');
const app = express();

app.use(express.static('assets'));

app.use(function(req, res, next) {
  if(req.originalUrl === '/store') {
    console.log('Jestem pośrednikiem przy żądaniu do /store.');
  }
  else {
    console.log('Hej, jestem pośrednikiem między każdym innym żądaniem poza /store a odpowiedzią!');
  }
  next();
});

app.get('/', function (req, res) {
  res.sendFile('./index.html');
});

app.get('/userform', function(req, res) {
  const response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  res.json(response);
});

app.get('/store', function(req, res) {
  res.send('To jest sklep.');
});

app.listen(3000);

app.use(function(req, res, next) {
  res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego czego żądasz.');
})

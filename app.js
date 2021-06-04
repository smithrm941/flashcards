const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', function (req, res) {
    // res.sendfile('./views/index');
    res.render('index');
});

app.listen(PORT, () => console.log(
  `Web App running at http://${localhost}:${PORT}/ Press Ctrl-C to terminate`
));

module.exports = app;

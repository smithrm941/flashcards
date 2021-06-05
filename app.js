const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";
const bodyParser = require('body-parser');
const users = require('./db/users.js');

const app = express();
app.use(express.static('public'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/signup', function (req, res) {
    res.render('signup');
});

app.post('/signup', function(req, res) {
  const {email, first_name, last_name, password, confirm_password} = req.body;
  users.findUserByEmail(email)
  .then((user) => {
    if(!user && password != confirm_password) {
      res.render('signup', {user: null, message: 'Passwords must match!'})
    } else if (!user && password == confirm_password) {
      users.addNewUser(email, first_name, last_name, password)
      res.redirect('/')
    } else {
        res.render('signup', {user: user, message: 'User already exists!'})
        // res.redirect('/')
    }
  })
})

app.listen(PORT, () => console.log(
  `Web App running at http://${localhost}:${PORT}/ Press Ctrl-C to terminate`
));

module.exports = app;

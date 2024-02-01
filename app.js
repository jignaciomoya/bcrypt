const express = require('express');
const session = require('express-session');
const { secret } = require('./crypto/config');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});

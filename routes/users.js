const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const users = require('../data/users');

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        const token = generateToken(user);
        req.session.token = token;
        res.redirect('/dashboard');
    } else {
        res.status(401).json({ message: 'Credenciales incorrectas' });
    }
});

router.get('/dashboard', verifyToken, (req, res) => {
    const userId = req.user;
    const user = users.find((u) => u.id === userId);

    if (user) {
        res.send(` <h1>Bienvenido, ${user.name}!</h1> <p>ID: ${user.id}</p> <p>Usuario: ${user.username}</p> <br> <form action="/logout" method="post"> <button type="submit">Cerrar sesión</button> </form> <a href="/">home</a> `);
    } else {
        res.status(401).json({ message: 'Usuario no encontrado' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;

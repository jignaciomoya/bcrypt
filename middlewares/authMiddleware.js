const jwt = require('jsonwebtoken');
const { hashedSecret } = require('../crypto/config');

function generateToken(user) {
    return jwt.sign({ user: user.id }, password, { expiresIn: '1h' });
}
function verifyToken(req, res, next) {
    const token = req.session.token;

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, password, (err, decoded) => {
        if (err) {
            return res
                .status(401)
                .json({ message: 'Token inválido', error: err.message });
        }

        req.user = decoded.user;
        next();

    });
}
module.exports = {
    generateToken,
    verifyToken
  };
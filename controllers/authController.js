// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const User = require('../models/User');

const register = (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ id: uuid.v4(), username, password: hashedPassword, role: 'user', visibility: 'public' });
    newUser.save((err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
};

const login = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err || !user || !bcrypt.compareSync(password, user.password)) {
            res.sendStatus(401);
        } else {
            const accessToken = jwt.sign({ username: user.username, role: user.role }, process.env.ACCESS_TOKEN_SECRET);
            res.json({ accessToken });
        }
    });
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

module.exports = { register, login, authenticateToken };

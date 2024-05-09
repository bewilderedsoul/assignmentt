// controllers/profileController.js

const User = require('../models/User');

const getProfile = (req, res) => {
    const { role, username } = req.user;
    const visibility = req.query.visibility || 'public';
    User.findOne({ username }, (err, user) => {
        if (err || !user) {
            res.sendStatus(404);
        } else if (role === 'admin' || user.visibility === 'public' || visibility === 'public') {
            res.json(user);
        } else {
            res.sendStatus(403);
        }
    });
};

const updateProfile = (req, res) => {
    const { username } = req.user;
    const { visibility } = req.body;
    User.findOneAndUpdate({ username }, { visibility }, { new: true }, (err, user) => {
        if (err || !user) {
            res.sendStatus(404);
        } else {
            res.sendStatus(200);
        }
    });
};

module.exports = { getProfile, updateProfile };

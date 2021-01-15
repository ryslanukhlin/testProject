const { validationResult } = require('express-validator');
const User = require('../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(403).json(errors);

    const user = new User({
        name: req.body.name,
        famuly: req.body.famuly,
        email: req.body.email,
        tell: 89101242618,
        password: bcrypt.hashSync(req.body.password, 7)
    })

    await user.save();

    return res.status(200).json({
        status: req.body
    });
};
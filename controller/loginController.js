const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { secretKey } = require('../config');

const createJWT = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = async (req, res) => {
    if(req.body.token) {
        const token = jwt.verify(req.body.token, config.secretKey);
        const user = await User.findOne({ _id: token.id });
        if(user){
            return res.status(200).json({
                token: createJWT({id: user.id}),
                user: user
            })
        }
    }
    const user = await User.findOne({email: req.body.email});
    if(!user) 
        return res.status(400).json({error: "user is not defined"});
    if(!bcrypt.compareSync(req.body.password, user.password))
        return res.status(400).json({error: "invalid password"});
    return res.status(200).json({
        token: createJWT({id: user.id}),
        user: user
    })
};
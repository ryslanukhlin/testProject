const Router = require('express').Router();
const { body } = require('express-validator');
const registerControlelr = require('../controller/registerController');
const User = require('../model/user');

Router.post('/register',
    body('email','email is error').isEmail().normalizeEmail().custom( async ( value, { req } ) => {
        const user = await User.findOne({ email: req.body.email });
        if(user) throw Error('email is register!');
    }),
    body('password').notEmpty().withMessage('password is empty').isLength({min:8}).withMessage('password min 8'),
    body('repeatPassword').custom((vaue, {req}) => {
        if(req.body.password !== req.body.repeatPassword) throw Error("repeat password dont Match");
        else return true;
    }),
    body('name', 'name is empty').notEmpty(),
    body('famuly', 'famult is empty').notEmpty(),
    body('tell').custom((value, {req}) => {
        if((value.split(' ').join('').length) != 15) throw Error("tell is error");
        else return true;
    })
, registerControlelr);

module.exports = Router;
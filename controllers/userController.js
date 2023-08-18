const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const controller = {
    register: (req, res) => {
        return res.render('register');
    },
    processRegister: (req, res) => {
        const resultValidations = validationResult(req);

        if(resultValidations.errors.length > 0) {
            return res.render('register', {
                errors: resultValidations.mapped(),
                oldData: req.body
            });
        }

        let userExists = User.findUserByField('email', req.body.email);

        if(userExists) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'Este email já está registrado'
                    },

                    oldData: req.body
                }
            });
        }

        let userToCreate = {
            ...req.body,
            psw: bcrypt.hashSync(req.body.psw, 10),
            avatar: req.file.filename
        }

        let userCreated = User.create(userToCreate);

        return res.redirect('/users/login');
    },

    login: (req, res) => {
        return res.render('login');
    },

    loginProcess: (req, res) => {
        let userToLogin = User.findUserByField('email', req.body.email);

        if(userToLogin) {
            let isPasswordVerified = bcrypt.compareSync(req.body.psw, userToLogin.psw);

            if(isPasswordVerified) {
                delete userToLogin.psw;
                req.session.userLogged = userToLogin;

                if(req.body.remember) {
                    res.cookie('userEmail',req.body.email, { maxAge: (1000 * 60) * 30 });
                }

                return res.redirect('/users/profile');
            }

            return res.render('login', {
                errors: {
                    psw: {
                        msg: 'Senha inválida'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Este email não foi encontrado'
                }
            }
        });
    },

    profile: (req, res) => {
        return res.render('profile', {
            userLogged: req.session.userLogged
        });
    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = controller;
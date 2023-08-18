const path = require('path');
const { check } = require('express-validator');

module.exports = [
    check('name')
        .notEmpty().withMessage('Tem de escrever um nome').bail()
        .trim(),
    check('email')
        .notEmpty().withMessage('Tem de escrever um email').bail()
        .trim().bail()
        .normalizeEmail().bail()
        .isEmail().withMessage('Digite um formato de email correto').bail(),
    check('psw')
        .notEmpty().withMessage('Tem de escrever uma senha').bail()
        .isLength({ min: 6 }).withMessage('A senha precisa ter 6 caracteres pelo menos').bail()
        .trim(),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptExtencions = ['.jpg','.png','.gif'];

        if(!file) {
            throw new Error('Precisa escolher um arquivo');
        } else {
            let fileExtension = path.extname(file.originalname);

            if(!acceptExtencions.includes(fileExtension)) {
                throw new Error(`As extensões de arquivo permitidas são ${acceptExtencions.join(', ')}`);
            }
        }

        return true;
    })
];

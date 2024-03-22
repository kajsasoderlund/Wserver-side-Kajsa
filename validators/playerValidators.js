const { check, validationResult } = require('express-validator');

const validateNewPlayer = [
    check('name')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name cannot be empty!')
        .isLength({ min: 2 })
        .withMessage('Name must be at least 2 characters long'),
    check('position')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Position cannot be empty!'),
    check('jersey')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Jersey number cannot be empty!')
        .isInt({ min: 1 })
        .withMessage('Jersey number must be a positive integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg);
            return res.status(422).json({errors: errors.array()});
        }
        next();
    }
];

module.exports = {
    validateNewPlayer
};

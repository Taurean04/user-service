const { body, param, query, validationResult } = require('express-validator');

module.exports = validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                body('payload.firstName').isString(),
                body('payload.lastName').isString(),
                body('payload.email').isEmail(),
                body('payload.password').isString()
            ]
        }
        case 'loginUser': {
            return [
                body('payload.email').isEmail(),
                body('payload.password').isString()
            ]
        }
        case 'userId': {
            return[
                param('id').isUUID()
            ]
        }
    }
};
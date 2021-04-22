const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    const {payload} = req.body;
    const {email} = payload;
    User.findOne({
        where: {email}
    }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }  
        next();
    });
};

const verifySignUp = {checkDuplicateUsernameOrEmail};

module.exports = verifySignUp;
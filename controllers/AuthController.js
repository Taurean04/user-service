const sequelize = require ('../config/database');
const User = require("../models").user;
const { body, param, query, validationResult } = require('express-validator');
const dotenv = require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {  
    const {payload} = req.body;
    const {email, password} = payload;
    
    const t = await sequelize.transaction ();

    try {

        let user = await User.findOne({where:{email}},{transaction:t})

        if(!user){
            return res.status(404).send({ message: "User Not found." });
        }

        let passwordIsValid = bcrypt.compare(
            user.password,
            password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        };

        let token = jwt.sign(
            {
                id: user.id,
                firstName: user.firstName
            },
            process.env.SECRET,
            {expiresIn: 864000}
        );

        await t.commit();
        res.status(200).json({
            userId: user.id,
            accessToken: token
        });
    } catch(e) {
        await t.rollback();
        console.log(e);
        res.status(500).json({message: 'Error occurred', e});
    }
}

exports.logout = async (req, res) => {    
    // Create a User
    
    const {accessToken} = req.accessToken;
    
    const t = await sequelize.transaction ();

    // Save User in the database
    try {

        let logout = await accessToken.deleteToken(token);

        if(!logout){
            return res.status(404).send({ message: "Unable to Logout User." });
        }
        await t.commit();
        res.status(200).json({
            message: "Logged out"
        });
    } catch(e) {
        await t.rollback();
        console.log(e);
        res.status(500).json({message: 'Error occurred', e});
    }
}

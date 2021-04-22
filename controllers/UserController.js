const sequelize = require ('../config/database');
const User = require("../models").user;
const { body, param, query, validationResult } = require('express-validator');

// Create and Save a new User
exports.createUser = async (req, res) => {    
    // Create a User
    const {payload} = req.body;
    
    const t = await sequelize.transaction ();

    // Save User in the database
    try {
        let data = await User.create({...payload}, {transaction: t});
        await t.commit();
        res.status(200).json({message: 'User created successfully', data});
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).json({message: 'Error occurred', e});
    }
}



// Retrieve all Users from the database.
exports.getAllUsers = async (req, res) => {
    const t = await sequelize.transaction ();
    try {
        let data = await User.findAll({transaction: t});
        await t.commit();
        res.status(200).json({users: data});
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).json({ message: 'Error occurred while retrieving users.', e});
    }

};

// Find a single User with an id
exports.getUserById = async (req, res) => {
    const {id} = req.params;
    const t = await sequelize.transaction ();

    try {
        let data = await User.findByPk(id, {transaction: t});
        if(data){
            await t.commit();
            res.status(200).json({user: data});
        }
        res.status(404).send({message: "User with the specified ID does not exists"});
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).json({message: "Error retrieving User with id=" + id, e});
    }

};

// Update a User by the id in the request
exports.updateUser = async (req, res) => {
    const {id} = req.params;
    const {payload} = req.body;
    const t = await sequelize.transaction ();

    try {
        let data = await User.update(payload, {where: {id}}, {transaction: t});
        let updated = await User.findOne({ where: {id}}, {transaction: t});
        await t.commit();
        res.status(200).json({ userInfo: updated,  message: "User was updated successfully."});
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).json({message: 'Error occurred', e});
    }

};

// Delete a User with the specified id in the request
exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    const t = await sequelize.transaction ();

    try {
        let data = await User.destroy({where: {id}}, {transaction: t});
        if(data){
            await t.commit();
            res.status(200).send({message: "User was deleted successfully!"});
        }
        res.status(404).send({ message: "User with the specified ID does not exists"});
    } catch (e) {
        await t.rollback();
        console.log(e);
        res.status(500).send({message: "Could not delete User with id=" + id, e});
    }
};
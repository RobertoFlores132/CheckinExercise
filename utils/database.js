const { Sequelize, DataTypes } = require('sequelize');

const db = new Sequelize({
    dialect: 'postgres',
    host:'localhost',
    username: 'postgres',
    password: 'Desarm354',
    port: 5432,
    database: 'checkinexercise'
});

module.exports = { db, DataTypes };
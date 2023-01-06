const db = require('../models');
const md5 = require('js-md5');

const getAll = () => new Promise((resolve, reject) => {
    db.User.findAll()
    .then((users) => {
        resolve(users);
    })
    .catch((error) => {
        reject(error);
    });
});

const create = (userObj) => new Promise((resolve, reject) => {
    userObj.password = md5(userObj.password);

    db.User.create(userObj)
    .then((users) => {
        resolve(users);
    })
    .catch((error) => {
        reject(error);
    });
});

const getById = (id) => new Promise((resolve, reject) => {
    db.User.findByPk(id)
    .then((user) => {
        resolve(user);
    })
    .catch((error) => {
        reject(error);
    });
});

const login = (email, password) => new Promise((resolve, reject) => {
    password = md5(password);

    db.User.findOne({
        where: {
            email: email,
            password: password
        }
    })
    .then((user) => {
        resolve(user);
    })
    .catch((error) => {
        reject(error);
    });
});

const friends = (userId) => new Promise((resolve, reject) => {
    db.User.findByPk(userId, {
        include: [{
            model: db.User,
            as: 'friends'
        }]
    })
    .then((user) => {
        resolve(user);
    })
    .catch((error) => {
        reject(error);
    });
});

module.exports = {
    getAll,
    create,
    getById,
    login,
    friends
}

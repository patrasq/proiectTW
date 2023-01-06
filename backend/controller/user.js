const db = require('../models');
const md5 = require('js-md5');
const jwt = require('jsonwebtoken');

const getAll = (search) => new Promise((resolve, reject) => {
    let users = null;

    if(search) {
        users = db.User.findAll(
            {
                where: {
                    name: {
                        [Sequelize.Op.like]: '%' + search + '%'
                    }
                }
            }
        );
    } else { 
        users = db.User.findAll();
    }

    console.log(users);

    users
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
        user.dataValues.token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, { expiresIn: 86400 });
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

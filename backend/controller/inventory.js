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

const create = (inventory) => new Promise((resolve, reject) => {
    db.Inventory.create(inventory)
    .then((result) => {
        resolve(result);
    })
    .catch((error) => {
        reject(error);
    });
});

module.exports = {
    create
}

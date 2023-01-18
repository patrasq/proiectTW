const db = require('../models');
const Sequelize = require('sequelize');

const getAll = () => new Promise((resolve, reject) => {
    db.Inventory.findAll()
        .then((users) => {
            resolve(users);
        })
        .catch((error) => {
            reject(error);
        });
});

const getByUserId = (userId) => new Promise((resolve, reject) => {
    db.Inventory.findAll({
        where: {
            user_id: userId
        }
    })
        .then((result) => {
            resolve(result);
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

const checkAlerts = () => new Promise((resolve, reject) => {
    // get current date
    let today = new Date();

    // 1 day from today
    let tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);


    db.Inventory.findAll({
        where: {
            expiresAt: {
                [Sequelize.Op.gt]: today,
                [Sequelize.Op.lt]: tomorrow
            }
        }
    })
        .then((result) => {
            // create alerts for each item
            result.forEach(element => {
                console.log(element);
                db.Alert.create({
                    title: 'Item Expiring Soon',
                    contents: 'Item ' + element.name + ' is expiring soon.',
                    user_id: element.user_id,
                })
            });
        })
        .catch((error) => {
            reject(error);
        });
});

const claim = (id, userId) => new Promise((resolve, reject) => {
    db.Inventory.update({
        user_id: userId
    }, {
        where: {
            id: id
        }
    })
        .then((result) => {
            resolve(result);
        })
        .catch((error) => {
            reject(error);
        });
});




module.exports = {
    create,
    getByUserId,
    claim,
    checkAlerts,
    getAll,
}

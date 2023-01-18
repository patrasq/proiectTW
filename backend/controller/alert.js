const db = require('../models');

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
    db.Alert.findAll({
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
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    Inventory.findAll({
      where: {
        expiresAt: {
          $gt: new Date(),
          $lt: tomorrow
        }
      }
    })
    .then((result) => {
        // create alerts for each item
        result.array.forEach(element => {
            db.Alert.create({
                title: 'Item Expiring Soon',
                contents: 'Item ' + element.name + ' is expiring soon.',
                user_id: element.user_id,
                inventory_id: element.id
            })
        });
    })
    .catch((error) => {
        reject(error);
    });
});


module.exports = {
    getAll,
    getByUserId
}

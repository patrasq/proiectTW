const db = require('../models');

const getAll = () => new Promise((resolve, reject) => {
    db.Category.findAll()
    .then((categories) => {
        resolve(categories);
    })
    .catch((error) => {
        reject(error);
    });
});

module.exports = {
    getAll
}

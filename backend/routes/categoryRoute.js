const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');

router.get('/', (req, res) => {
    categoryController.getAll()
    .then((result) => {
        res.send({
            status: 'success',
            data: result,
        });
    })
    .catch((error) => {
        res.send({
            message: 'Could not complete request.',
            error
        });
    });
});

module.exports = router;

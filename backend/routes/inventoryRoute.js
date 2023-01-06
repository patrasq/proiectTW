const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventory');

router.post('/', (req, res) => {
    inventoryController.create(req.body)
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

router.get('/:userId', (req, res) => {

    // If :userId is not friend of current user, return error
    inventoryController.getByUserId(req.params.userId)
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

const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventory');
const jwt = require('jsonwebtoken');

router.get('/', (req, res) => {
    inventoryController.getAll()
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

router.get('/:id', (req, res) => {
    inventoryController.getByUserId(req.params.id)
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

router.put('/:id', (req, res) => {
    let token = req.headers.authorization.split('Bearer ')[1];
    let userId = jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            reject(error);
        } else {
            return decoded.id;
        }
    });

    inventoryController.claim(req.params.id, userId)
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

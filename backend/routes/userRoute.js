const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/', (req, res) => {
    userController.getAll()
    .then((result) => {
        res.send({
            status: 'success',
            data: result,
        });
    })
    .catch((error) => {
        res.send({
            message: 'Some error occoured',
            error
        });
    });
});

router.post('/login', (req, res) => {
    userController.login(req.body.email, req.body.password)
    .then((result) => {
        res.send({
            status: 'success',
            data: result,
        });
    })
    .catch((error) => {
        res.send({
            message: 'Some error occoured',
            error
        });
    });
});

router.get('/:id', (req, res) => {
    userController.getById(req.params.id)
    .then((result) => {
        res.send({
            status: 'success',
            data: result,
        });
    })
    .catch((error) => {
        res.send({
            message: 'Some error occoured',
            error
        });
    });
});

router.post('/', (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.password) {
        res.send({
            message: 'Name, email and password are required',
        });
        return;
    }

    userController.create(req.body)
    .then((result) => {
        res.send({
            message: 'New user has been created',
            data: result,
        });
    })
    .catch((error) => {
        console.error(error);
        res.send({
            message: 'Some error occoured',
            error
        });
    });
});

module.exports = router;

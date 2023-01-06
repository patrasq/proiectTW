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
            message: 'Could not complete request.',
            error
        });
    });
});

router.post('/login', (req, res) => {
    userController.login(req.body.email, req.body.password)
    .then((result) => {
        res.send({
            status: 'success',
            data: result
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
    userController.getById(req.params.id)
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

    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(406);
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
        res.status(406);
        res.send({
            message: 'Could not complete request.',
            error
        });
    });
});

module.exports = router;

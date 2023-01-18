const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
    userController.getAll(req.query.search ?? null)
        .then((result) => {
            res.send({
                status: 'success',
                data: result,
            });
        })
        .catch((error) => {
            console.log(error);
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
            console.log(error);
            res.send({
                message: 'Could not complete request.',
                error
            });
        });
});

// router.get('/logout', (req, res) => {
//     userController.logout(req, res)
//         .then((result) => {
//             res.send({
//                 status: 'success',
//                 data: result
//             });
//         })
//         .catch((error) => {
//             console.log(error);
//             res.send({
//                 message: 'Could not complete request.',
//                 error
//             });
//         });
// });

router.post('/friends', (req, res) => {
    let token = req.headers.authorization.split('Bearer ')[1];
    let userId = jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            reject(error);
        } else {
            return decoded.id;
        }   
    });

    userController.addFriend(userId, req.body.friendId)
        .then((result) => {
            res.send({
                status: 'success',
                data: result
            });
        })
        .catch((error) => {
            console.log(error);
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

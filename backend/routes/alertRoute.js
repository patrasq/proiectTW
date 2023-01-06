const express = require('express');
const router = express.Router();
const alertController = require('../controller/alert');

router.get('/', (req, res) => {
    alertController.getAll()
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

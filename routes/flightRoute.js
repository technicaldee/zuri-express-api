const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.all)
router.post('/', controller.post)
router.get('/flight/:id', controller.single)
router.put('/flight/:id', controller.update)
router.delete('/flight/:id', controller.deleteFlight)

module.exports = router;


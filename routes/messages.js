const express = require('express');
const REST = require('./API/REST');

const router = express.Router();

router.get('/', function(req, res) {
    "use strict";
    REST.messages.get(req, res);
});

router.post('/', function(req, res) {
    "use strict";
    REST.messages.post(req, res);
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.send('hello, I love Manya');  
});

module.exports = router;
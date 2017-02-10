var express = require('express');
var router = express.Router();

/* GET users listing. */
router.delete('/diet', function(req, res, next) {
    console.log('일단 여기는?');
    
    res.json({success:true});
});

module.exports = router;

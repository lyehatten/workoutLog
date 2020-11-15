let express = require('express');
let router = express.Router();

router.post('/', function(req, res){
    res.send('allows useres to create log')
})

router.get('/', function(req, res){
    res.send('get all logs for user')
})

router.get('/:id', function(req, res){
    res.send('gets indiv logs by id for a user')
})

router.put('/:id', function(req, res){
    res.send('update a log')
})

router.delete('/:id', function(req, res){
    res.send('delete a log by id')
})

module.exports = router;
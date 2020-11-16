const router = require('express').Router();
const Log = require('../db').import('../models/log');

router.post('/', (req, res)=> {
    const logEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
        owner: req.user.id
    }
    Log.create(logEntry)
        .then(log => res.status(200).json(log))
        .catch(err => res.status(500).json({ error: err}))
})

router.get('/', (req, res)=> {
    Log.findAll()
        .then(logs => res.status(200).json(logs))
        .catch(err => res.status(500).json({ error: err}))
});

router.get('/:id', function (req, res) {
    let id = req.params.id;

    Log.findAll({
        where: { id: id}
    })
    .then(logs => res.status(200).json(logs))
    .catch(err => res.status(500).json({ error: err}))
});


router.put('/:id', function(req, res){
    const updateLogEntry = {
        description: req.body.description,
        definition: req.body.definition,
        result: req.body.result,
    };

    const query = {where: {id: req.params.id, owner: req.user.id}};

    Log.update(updateLogEntry, query)
    .then(() => res.status(200).json({message: "log entry updated!"}))
    .catch((err) => res.status(500).json({ error: err}));
        
});

router.delete('/:id', function(req, res){
    const query = { where: { id: req.params.id, owner: req.user.id }};
    
    Log.destroy(query)
    .then(() => res.status(200).json({message: "log entry removed"}))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
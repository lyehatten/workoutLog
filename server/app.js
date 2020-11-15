let express = require('express');
let app = express();
let sequelize = require('./db');
let log = require('./controllers/logcontroller')


sequelize.sync()

app.post('/user', function(req, res){
    res.send('hi this is our user shit')
})

app.post('/login', function(req, res){
    res.send('woot woot')
})

app.use('/log', log)

app.listen(4050, function (){
    console.log('App is listening on port 4050.');
});
require('dotenv').config(); 
let express = require('express');
let app = express();
let sequelize = require('./db');
let log = require('./controllers/logcontroller')
let user = require('./controllers/usercontroller')
const login = require('./controllers/logincontroller')

sequelize.sync()

app.use(express.json());

app.use('/user', user);

app.use('/login', login)

const validateSession = require('./middleware/validate-session')

app.use('/log', validateSession, log);

app.listen(4050, function (){
    console.log('App is listening on port 4050.');
});
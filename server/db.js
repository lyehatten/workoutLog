const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', process.env.PG_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to workout-log database!');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;
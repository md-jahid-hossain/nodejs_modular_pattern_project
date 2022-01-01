const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs_assignment_1', 'root', '', {
    dialect: 'mysql',
    define: { timestamps: false },
    logging: false
});

module.exports = sequelize;

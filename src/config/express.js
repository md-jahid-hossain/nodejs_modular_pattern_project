const path = require('path');
const users = require(path.join(process.cwd(), 'src/modules/user/user.routes'));
const products = require(path.join(
    process.cwd(),
    'src/modules/product/product.routes'
));

const express = require('express');

module.exports = async function () {
    const app = express();
    app.use(express.json());

    users(app);
    products(app);

    app.get('/', function (req, res) {
        res.send('Server is running.');
    });

    return app;
};

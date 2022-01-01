const Product = require("./product.model");

const getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();

        res.send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) return res.status(404).send('Product not found.');

        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

const createProduct = async (req, res) => {
    const { title, price, category, quantity } = req.body;

    try {
        const product = {
            title,
            price,
            category,
            quantity,
        };

        const newProduct = await Product.create(product);

        res.status(201).send(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, category, quantity } = req.body;

    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) return res.status(404).send('Product not found.');

        const updateProduct = await product.update(
            {
                title,
                price,
                category,
                quantity,
            },
            { where: { id } }
        );

        res.status(201).send(updateProduct);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

const updateProductQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) return res.status(404).send('Product not found.');

        await product.update({ quantity }, { where: { id } });

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) return res.status(404).send('Product not found.');

        await product.destroy();

        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

const setRating = async (req, res) => {
    const { id } = req.params;
    const { rating } = req.body;

    try {
        const product = await Product.findOne({ where: { id } });
        if (!product) return res.status(404).send('Product not found.');

        let rate = { rating, count: 1 };

        if (product.rate) {
            const productRate = JSON.parse(product.rate);

            const newRating =
                (productRate.rating * productRate.count + rating) /
                (productRate.count + 1);

            rate = {
                rating: parseFloat(newRating.toFixed(2)),
                count: productRate.count + 1,
            };
        }

        await product.update({ rate }, { where: { id } });

        res.status(201).send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    updateProductQuantity,
    deleteProduct,
    setRating,
};

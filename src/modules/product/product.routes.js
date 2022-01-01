const path = require('path');
const {
    productCreateSchema,
    productUpdateSchema
} = require('./product.schema');
const controller = require('./product.controllers');
const validation = require(path.join(
    process.cwd(),
    'src/modules/core/middlewares/validation'
));

module.exports = (app) => {
    app.route('/api/products')
        .get(controller.getProducts)
        .post(validation(productCreateSchema), controller.createProduct);

    app.route('/api/products/:id')
        .get(controller.getProduct)
        .put(validation(productCreateSchema), controller.updateProduct)
        .patch(
            validation(productUpdateSchema),
            controller.updateProductQuantity
        )
        .delete(controller.deleteProduct)
        .patch(validation(productUpdateSchema), controller.setRating);
};


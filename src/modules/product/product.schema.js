const { object, string, number } = require('yup');

const productSchema = {
    title: string()
        .required('Title is not empty.')
        .max(255, 'Title not more than 255 characters long.'),
    price: number()
        .required('Price is not empty.')
        .typeError('Price must be a number.')
        .positive('Price must be a positive number.'),
    category: string()
        .required('Category is not empty.')
        .max(255, 'Category not more than 255 characters long.'),
    rating: number()
        .typeError('Rating must be a number.')
        .min(0, 'Rating is 0 or greater than 0')
        .max(5, 'Rating is 5 or less than 5'),
};

const productCreateSchema = object().shape({
    title: productSchema.title,
    price: productSchema.price,
    category: productSchema.category,
    quantity: number()
        .typeError('Quantity must be a number.')
        .required('Quantity is required.')
        .positive('Quantity must be a positive number.')
        .integer('Quantity must be a integer number.')
        .min(1, 'Minimum 1 product is required.'),
});

const productUpdateSchema = object().shape({
    rating: productSchema.rating,
    quantity: number()
        .typeError('Quantity must be a number.')
        .positive('Quantity must be a positive number.')
        .integer('Quantity must be a integer number.')
        .min(1, 'Minimum 1 product is required.'),
});

module.exports = { productCreateSchema, productUpdateSchema };

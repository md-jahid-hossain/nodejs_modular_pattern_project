const path = require('path');
const validation = require(path.join(
    process.cwd(),
    'src/modules/core/middlewares/validation'
));
const controller = require('./user.controllers');
const { registerSchema, profileSchema } = require('./user.schema');

module.exports = (app) => {
    app.route('/api/users')
        .get(controller.getUsers)
        .post(validation(registerSchema), controller.createUser);

    app.route('/api/users/:id')
        .get(controller.getUser)
        .put(validation(profileSchema), controller.updateUser)
        .patch(validation(profileSchema), controller.updateUserPartially)
        .delete(controller.deleteUser);
};

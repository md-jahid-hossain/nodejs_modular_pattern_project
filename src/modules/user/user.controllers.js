const UserType = require('./user-types.model');
const User = require('./user.model');
const jwt = require('jsonwebtoken');

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user || !user.password || !User.validPassword(password))
            return res.status(400).send('Invalid email or password.');

        const payload = { user_id: user.id, email: user.email };
        const token = jwt.sign(payload, 'iamsecretkey', { expiresIn: '2h' });

        user.dataValues.token = token;

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: UserType,
                    as: 'user_types'
                }
            ]
        });

        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).send('User not found.');

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function createUser(req, res) {
    const { username, email, password, userTypeId } = req.body;

    try {
        const isUsernameExist = await User.findOne({ where: { username } });
        if (isUsernameExist) return res.status(400).send('Duplicate username.');

        const user = await User.create({
            username,
            email,
            password,
            user_type_id: userTypeId
        });

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function updateUser(req, res) {
    const { id } = req.params;
    const { first_name, last_name, age, phone_number, address } = req.body;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).send('User not found.');

        const updatedUser = await user.update(
            {
                first_name,
                last_name,
                age,
                phone_number,
                address
            },
            { where: { id } }
        );

        res.status(201).send(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function updateUserPartially(req, res) {
    const { id } = req.params;
    const { first_name, last_name, age, phone_number, address } = req.body;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).send('User does not exits anymore.');

        if (first_name) await user.update({ first_name });
        if (last_name) await user.update({ last_name });
        if (age) await user.update({ age });
        if (phone_number) await user.update({ phone_number });
        if (address) await user.update({ address });

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).send('User not found.');

        await user.destroy();

        res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    updateUserPartially,
    deleteUser,
    login
};

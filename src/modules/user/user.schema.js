const { object, string, ref } = require('yup');

const userSchema = {
    username: string()
        .required('Username is required.')
        .matches()
        .min(3, 'User name must be at least 3 characters long.')
        .max(255, 'User name not more than 255 characters long.'),
    email: string()
        .required('Email is required.')
        .email('Must be a valid email address.')
        .max(100, 'Email not more than 100 characters long.')
        .test(
            'is-valid-email-length',
            'Before @ the email not more than 64 characters long.',
            (email) => email.split('@')[0].length <= 64
        ),
    password: string()
        .required('Password is required.')
        .min(8, 'Password must be at least 8 characters long.')
        .max(255, 'Password not more than 255 characters long.')
        .matches(
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/,
            'Password must include at least one uppercase, lowercase, number and special character.'
        ),
    confirm_password: string().oneOf(
        [ref('password')],
        'Passwords must match.'
    ),
    first_name: string()
        .matches(/^[a-zA-Z]*$/, 'First name allowed only English Alphabets.')
        .min(3, 'First name must be at least 3 characters long.')
        .max(255, 'First name not more than 255 characters long.'),
    last_name: string()
        .matches(/^[a-zA-Z]*$/, 'First name allowed only English Alphabets.')
        .min(3, 'Last name must be at least 3 characters long.')
        .max(255, 'Last name not more than 255 characters long.')
};

const registerSchema = object().shape({
    username: userSchema.username,
    email: userSchema.email,
    password: userSchema.password,
    confirm_password: userSchema.confirm_password
});

const profileSchema = object().shape({
    first_name: userSchema.first_name,
    last_name: userSchema.last_name
});

module.exports = { registerSchema, profileSchema };

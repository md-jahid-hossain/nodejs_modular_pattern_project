const validation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = [];
        error.inner.forEach((err) => {
            const isPathExist = errors.find((e) => e.path === err.path);
            if (!isPathExist)
                errors.push({ path: err.path, message: err.message });
        });
        return res.status(400).send(errors);
    }
};

module.exports = validation;

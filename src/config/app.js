(async function () {
    const app = await require('./express')();

    const PORT = 5000;
    app.listen(PORT, () => console.log(`Listen on port ${PORT}`));
})();

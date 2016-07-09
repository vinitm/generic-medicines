module.exports = function (gulp, plugins) {
    return function (done) {
        plugins.reload();
        done();
    };
};
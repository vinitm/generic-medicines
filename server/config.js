module.exports = {
    dbPath: process.env.MONGOLAB_URI || "mongodb://localhost/medicine",
    port: process.env.PORT || 8000
};
const mongoose = require('mongoose');

module.exports = function(connectionString) {
    return mongoose.connect(connectionString, { useNewUrlParser: true }).then(() => {
        console.log('Connected to database!!');
    })
}
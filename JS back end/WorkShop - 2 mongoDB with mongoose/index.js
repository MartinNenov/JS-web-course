global.__basedir = __dirname;
const env = process.env.NODE_ENV || 'development';

const database = require('./config/database');


const config = require('./config/config')[env];
const app = require('express')();

require('./config/express.js')(app);
require('./config/routes.js')(app);



database(config.connectionString).then(() => {
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
})
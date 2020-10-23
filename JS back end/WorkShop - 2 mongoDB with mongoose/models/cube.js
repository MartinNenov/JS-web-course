let BaseModel = require('./base');
let path = require('path');

class CubeModel extends BaseModel {
    constructor() {
        //const filePath = path.join(global.__basedir, '/config/database.json');
        const filePath = '/config/database.js'

        super(filePath);
    }

    insert(name, description, imageURL, difficultyLevel) {
        /* if (!name || !description || !imageURL || !difficultyLevel) {
            return Promise.reject(new Error('BAD_REQUEST'));
        }
        return super.insert({ name, description, imageURL, difficultyLevel }) */
    }

    getAll(data) {
        const { name, from, to } = data;

        /* if (!data) { return super.getAll(); }
        const { name, from, to } = data;
        return super.queryBy(function(entry) {
            return (name ? entry.name.includes(name) : true) &&
                (from ? entry.difficultyLevel >= from : true) &&
                (to ? entry.difficultyLevel <= to : true);
        }); */
    }
}

module.exports = new CubeModel();
const mongoose = require('mongoose');

const accessoriesModel = new mongoose.Schema({
    name: {
        type: String,
        requires: [true, 'Name is Required!']
    },
    description: {
        type: String,
        requires: [true, 'Descrioption is Required!'],
        validate: {
            validator: function(v) {
                return v.length < 200;
            },
            message: `Description is too long.Length should not be more than 200 characters!`
        }
    },
    imageURL: {
        type: String,
        requires: [true, 'imageURL is Required!'],
        validate: {
            validator: function(v) {
                return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(v);
            },
            message: `ImageURL adress is not valid!`
        }
    },
    cubes: [mongoose.Schema.Types.ObjectId]
})

module.exports = mongoose.model('accessories', accessoriesModel);
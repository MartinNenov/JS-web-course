const AccessoriesModel = require('../models/accessoriesModel');
const CubeModel = require('../models/cubeModel');
module.exports = {
    createAccessoryGet(req, res) {
        res.render('createAccessory');
    },
    createAccessoryPost(req, res) {
        const { name, description, imageURL } = req.body;
        AccessoriesModel.create({ name, description, imageURL }, function(err, data) {
            if (err) { console.log(err); return; };
            res.redirect('/');
        }).catch(next);
    },
    attachAccessoryGet(req, res) {
        const id = req.params.id;
        CubeModel.findOne({ _id: id }, function(err, cube1) {
            let { name, description, imageURL } = cube1;
            let cube = { name, description, imageURL }
            if (err) { console.log(err); return }
            AccessoriesModel.find({}, function(err, accessories1) {
                let accessories2 = accessories1.reduce((acc, curr, index) => {
                    let { imageURL, name, description, cubes, _id } = curr;
                    return acc.concat([{ imageURL, name, description, cubes, _id }]);
                }, [])
                let accessories = accessories2.filter(function(accessory) {
                    let cubes1 = accessory.cubes.reduce((acc, curr) => {
                        return acc.concat([curr.toHexString()]);
                    }, []);
                    let bool = (!cubes1.includes(id) || (accessory.cubes.length == 0));
                    return bool;
                })
                res.render('attachAccessory', { cube, accessories, id });

            });
        }).catch(next);
    },
    attachAccessoryPost(req, res) {
        const accessoryId = req.body.accessory;
        const cubeId = req.params.id;

        Promise.all([
            AccessoriesModel.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } }),
            CubeModel.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } })
        ]).then(() => {
            res.redirect('/details/' + cubeId)
        }).catch(next);

    },
    getCube(req, res) {
        const id = +req.params.id;
        CubeModel.findById(id).then(cube => {
            res.render('createAccessory');
        }).catch(next);
    },
    getCreateCube(req, res) {
        res.render('create');
    }
}
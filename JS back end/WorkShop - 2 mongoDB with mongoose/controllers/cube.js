const CubeModel = require('../models/cubeModel');
const AccessoryModel = require('../models/accessoriesModel');
module.exports = {
    getCubes(req, res) {
        const from = req.query.from || 0;
        const search = req.query.from || '';
        const to = req.query.from || 10;

        CubeModel.find({ difficultyLevel: { $gte: +from, $lte: +to }, name: { $regex: search } },
            function(err, cubesInitial) {
                let cubes = cubesInitial.reduce((acc, curr, index) => {
                    let { imageURL, name, difficultyLevel, id } = curr;
                    return acc.concat([{ imageURL, name, difficultyLevel, id }]);
                }, [])
                if (err) {
                    console.log(err);
                    return;
                }
                res.render('index', { cubes, from, search, to });
            }
        ).catch(next);
    },
    getCube(req, res, next) {
        const id = req.params.id;
        CubeModel.findById(id).then(cube => console.log(cube))
        CubeModel.findById(id).populate('accessories').then(cube1 => {
            let { name, description, imageURL, difficultyLevel, accessories } = cube1;
            let cube = { name, description, imageURL, difficultyLevel, accessories }
            res.render('details', { cube, id });
        }).catch(next);
    },
    postCreateCube(req, res, next) {
        const { name, description, difficultyLevel, imageURL } = req.body;
        CubeModel.create({ name, description, imageURL, difficultyLevel: +difficultyLevel }, function(err, data) {
            if (err) { console.log(err); return; };
            res.redirect('/');

        }).catch(next);


    },
    getCreateCube(req, res) {
        res.render('create');
    }
}
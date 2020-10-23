// TODO: Require Controllers...
const cubeController = require('../controllers/cube');
const accecoryController = require('../controllers/accessories');

module.exports = (app) => {
    // TODO...
    app.get('/', cubeController.getCubes);
    app.get('/details/:id', cubeController.getCube);

    app.get('/create/accessory', accecoryController.createAccessoryGet);
    app.post('/create/accessory', accecoryController.createAccessoryPost);

    app.post('/create', cubeController.postCreateCube);
    app.get('/create', cubeController.getCreateCube);

    app.get('/attach/accessory/:id', accecoryController.attachAccessoryGet);
    app.post('/attach/accessory/:id', accecoryController.attachAccessoryPost)

    app.get('/about', function(req, res) {
        res.render('about');
    });

    app.get('*', function(req, res) {
        res.render('404');
    });

    app.use(function(err, req, res, next) {
        if (err.message === 'BAD_REQUEST') {
            res.status(400);
            return;
        }
    });
};
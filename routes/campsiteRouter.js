const express = require('express');
const campsiteRouter = express.Router();

//Campsite Route
campsiteRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the campsites to you');
})
.post((req, res) => {
    res.end(`Will add the campsite: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete((req, res) => {
    res.end('Deleting all campsites');
});

//Campsite Id Route
campsiteRouter.route('/:campsitesId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send this campsites to you: CAMPSITE #${req.params.campsitesId}`);
})
.put((req, res) => {
    res.write(`Updating the campsite: CAMPSITE #${req.params.campsitesId}\n`);
    res.end(`Will update the campsite: ${req.body.name}
        with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /campsites/:campsitesId');
})
.delete((req, res) => {
    res.end(`Deleting this campsite: CAMPSITE #${req.params.campsitesId}`);
});


module.exports = campsiteRouter;
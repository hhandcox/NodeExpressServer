const express = require('express');
const partnerRouter = express.Router();

//Partner Route
partnerRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the partners to you');
})
.post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
    res.end('Deleting all partners');
});

//Partner Id Route
partnerRouter.route('/:partnersId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send this partner to you:  PARTNER #${req.params.partnersId}`);
})
.put((req, res) => {
    res.write(`Updating the partner: PARTNER #${req.params.partnersId}\n`);
    res.end(`Will update the partner: ${req.body.name}
        with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /partners/:partnersId');
})
.delete((req, res) => {
    res.end(`Deleting this partner: PARTNER #${req.params.partnersId}`);
});


module.exports = partnerRouter;
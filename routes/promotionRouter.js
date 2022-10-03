const express = require('express');
const promotionRouter = express.Router();

//Promotion Route
promotionRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the promotions to you');
})
.post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res) => {
    res.end('Deleting all promotions');
});

//Promotion Id Route
promotionRouter.route('/:promotionsId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send this promotion to you: PROMOTION #${req.params.promotionsId}`);
})
.put((req, res) => {
    res.write(`Updating the promotion: PROMOTION #${req.params.promotionsId}\n`);
    res.end(`Will update the promotion: ${req.body.name}
        with description: ${req.body.description}`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/:promotionsId');
})
.delete((req, res) => {
    res.end(`Deleting this promotion: PROMOTION #${req.params.promotionsId}`);
});


module.exports = promotionRouter;
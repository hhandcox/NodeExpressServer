const express = require('express');
const authenticate = require('../authenticate');
const cors = require('./cors');
const Favorite = require('../models/favorite');

const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
        .populate('user')
        .populate('campsites')
        .then(favorites => {
            console.log('Favorites .Get');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(favorites);
        })
        .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        if (favorite) {
            req.body.forEach((campsite) => {
                if (!favorite.campsites.includes(campsite._id)) {
                    favorite.campsites.push(campsite._id);
                }
            });
            favorite
                .save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch((err) => next(err));
        }
        else {
            Favorite.create({ user: req.user._id })
                .then(favorite => {
                    req.body.forEach(campsite => {
                        favorite.campsites.push(campsite._id);
                    });
                    favorite.save()
                    .then(favorite => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                    })
                    .catch((err) => next(err));
            });
        }
    })
    .catch(err => next(err));
})
.put(cors.cors, (req, res, next) => {
    Favorite.find()
    .then(favorite => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete({ user: req.user._id })
    .then(favorite => {
        res.statusCode = 200;
        if (favorite) {
            res.setHeader('Content-Type', 'application/json');
            res.json(response);
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end('You have no favorites to delete!');
        }
    })
    .catch((err) => next(err));
});

//favorite/campsiteId Route
favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req, res, next) => {
    Favorite.find()
    .then(favorite => {
        res.statusCode = 403;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        res.statusCode = 200;
        if(favorite) {
            if (!favorite.includes(req.param.campsiteId)) {
                favorite.campsites.push(req.params.campsiteId);
            favorite
                .save()
                .then((favorite) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));
            } else {
                res.setHeader('Content-Type', 'text/plain');
                res.end('That campsite is already in your list of favorites!');
            }
        } else {
            Favorite.create({
                user: req.user._id,
                campsites: [req.params.campsiteId],
            })
            .then(favorite => {
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite);
            })
            .catch(err => next(err));
        }
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
    .then(favorite => {
        req.statusCode = 200;
        if(favorite){
            favorite.campsites = favorite.campsites.filter((campsite) => {
                campsite.toString() !== req.params.campsiteId;
            });
            favorite
                .save()
                .then(favorite => {
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })
                .catch(err => next(err));
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end('There are no favorites to delete!')
        }
    }).catch(err => next(err))
})

module.exports = favoriteRouter;
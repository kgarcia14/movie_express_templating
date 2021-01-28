'use strict';

const express = require('express'),
    router = express.Router();

const movieData = require('../db');

router.get('/', (req, res) => {
    console.log(movieData);
    res.render('template', {
        locals: {
            title: "List of Movies",
            data: movieData
        },
        partials: {
            body: 'partials/movie-list'
        },
    });
});

router.get('/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    const movie = movieData.find((movie) => {
        if (movie.imdbID === imdbID) {
            return movie;
        }
    })
    if (movie) {
        res.render('template', {
            locals: {
                title: `${movie.Title}`,
                movie
            },
            partials: {
                body: 'partials/movie-details'
            },
        });
    }
    else {
        res.status(404).send(`No CEO found that matches movieData, ${movieData}`);
    }
});

module.exports = router;
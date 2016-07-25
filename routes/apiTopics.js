var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

router.get('/', function(req, res, next) {
  knex('topics').then(function(data) {
    res.send(data);
  });
});

router.post('/', function(req,res,next) {
  if (!req.body ||
    !req.body.title ||
    !req.body.name ||
    !req.body.description) {
    res.status(400).json({ error: 'Bad Request' });
  }
  knex('topics')
    .insert({
      title: req.body.title,
      name: req.body.name,
      description: req.body.description,
      score: 1,
      isActive: true
    })
    .then(function() {
      res.send("Topic Added");
    })
    .catch(function(err) {
      next(err);
    });
});

router.post('/:id/upvote', function(req,res,next) {
  knex('topics')
  .where('id','=',req.params.id)
  .increment('score',1)
  .then(function () {
    res.send("Upvoted")
  })
});

module.exports = router;

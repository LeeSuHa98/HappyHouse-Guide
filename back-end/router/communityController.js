const router = require('express').Router();
const communitys = require('../model/community');

// Find All
router.get('/', (req, res) => {
    communitys.findAll()
    .then((communitys) => {
      if (!communitys.length) return res.status(404).send({ err: 'communitys not found' });
      res.send({communitysList : communitys});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/:id', (req, res) => {
    communitys.findOneById(req.params.id)
    .then((communitys) => {
      if (!communitys) return res.status(404).send({ err: 'communitys not found' });
      res.send({communitys});
    })
    .catch(err => res.status(500).send(err));
});

// Create new document
router.post('/', (req, res) => {
    communitys.create(req.body)
    .then(communitys => res.send(communitys))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.put('/:id', (req, res) => {
    communitys.updateById(req.params.id, req.body)
    .then(communitys => res.send(communitys))
    .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/:id', (req, res) => {
    communitys.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
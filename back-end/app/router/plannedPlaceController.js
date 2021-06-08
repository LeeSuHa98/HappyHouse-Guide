const router = require('express').Router();
const plannedPlace = require('../model/plannedPlace');

// Find All
router.get('/', (req, res) => {
    plannedPlace.findAll()
    .then((plannedPlace) => {
      if (!plannedPlace.length) return res.status(404).send({ err: 'plannedPlace not found' });
      res.send({plannedPlaceList : plannedPlace});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/:id', (req, res) => {
    plannedPlace.findOneById(req.params.id)
    .then((plannedPlace) => {
      if (!plannedPlace) return res.status(404).send({ err: 'plannedPlace not found' });
      res.send({plannedPlace});
    })
    .catch(err => res.status(500).send(err));
});


module.exports = router;
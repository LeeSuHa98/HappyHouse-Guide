const router = require('express').Router();
const FAQ = require('../model/FAQ');

// Find All
router.get('/', (req, res) => {
    FAQ.findAll()
    .then((FAQ) => {
      if (!FAQ.length) return res.status(404).send({ err: 'FAQ not found' });
      res.send({FAQList : FAQ});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/:id', (req, res) => {
    FAQ.findOneById(req.params.id)
    .then((FAQ) => {
      if (!FAQ) return res.status(404).send({ err: 'FAQ not found' });
      res.send({FAQ});
    })
    .catch(err => res.status(500).send(err));
});

// Create new document
router.post('/', (req, res) => {
    FAQ.create(req.body)
    .then(FAQ => res.send(FAQ))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.put('/:id', (req, res) => {
    FAQ.updateById(req.params.id, req.body)
    .then(FAQ => res.send(FAQ))
    .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/:id', (req, res) => {
    FAQ.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
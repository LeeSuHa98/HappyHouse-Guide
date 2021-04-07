const router = require('express').Router();
const dibs = require('../model/dibs');

// Find All
router.get('/', (req, res) => {
    dibs.findAll()
    .then((dibs) => {
      if (!dibs.length) return res.status(404).send({ err: 'dibs not found' });
      res.send({dibsList : dibs});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/id/:id', (req, res) => {
    dibs.findOneById(req.params.id)
    .then((dibs) => {
      if (!dibs) return res.status(404).send({ err: 'dibs not found' });
      res.send({dibs});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/userid/:id', (req, res) => {
    dibs.findByUserId(req.params.id)
    .then((dibs) => {
      if (!dibs) return res.status(404).send({ err: 'dibs not found' });
      res.send({dibs});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/houseid/:id', (req, res) => {
    dibs.findByHouseId(req.params.id)
    .then((dibs) => {
      if (!dibs) return res.status(404).send({ err: 'dibs not found' });
      res.send({dibs});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/:userId/:houseId', (req, res) => {
    dibs.findByUserIdAndHouseId(req.params.userId,req.params.houseId)
    .then((dibs) => {
      if (!dibs) return res.status(404).send({ err: 'dibs not found' });
      res.send({dibs});
    })
    .catch(err => res.status(500).send(err));
});



// Create new document
router.post('/', (req, res) => {
    dibs.create(req.body)
    .then(dibs => res.send(dibs))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.put('/:id', (req, res) => {
    dibs.updateById(req.params.id, req.body)
    .then(dibs => res.send(dibs))
    .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/:id', (req, res) => {
    dibs.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
const router = require('express').Router();
const users = require('../model/users');
const salt  = require(path.join(__dirname, 'config', 'db.json'))
 .salt
const hashing = require(path.join(__dirname, 'config', 'hashing.js'))
// Find All
router.get('/', (req, res) => {
    users.findAll()
    .then((user) => {
      if (!user.length) return res.status(404).send({ err: 'users not found' });
      res.send({usersList : user});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/:id', (req, res) => {
    users.findByUserId(req.params.id)
    .then((user) => {
      if (!user) return res.send({ err: 'users not found' });
      res.send({user});
    })
    .catch(err => res.status(500).send(err));
});

// Create new document
router.post('/', (req, res) => {
    console.log(req.body);
    const hash = hashing.enc(req.body.id, req.body.password, salt);
    console.log('1. salt 값 : ' , salt)
    console.log('3. hash 결과 : ', hash)
    // users.create(req.body)
    // .then(users => res.send(users))
    // .catch(err => res.status(500).send(err));
});

// Update by id
router.put('/:id', (req, res) => {
    users.updateById(req.params.id, req.body)
    .then(user => res.send(user))
    .catch(err => res.status(500).send(err));
});

// Delete by id
router.delete('/:id', (req, res) => {
    users.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
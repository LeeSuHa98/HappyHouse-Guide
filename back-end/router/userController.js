const router = require('express').Router();
const users = require('../model/users');
var bcrypt = require('bcrypt');
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
    console.log("회원가입")
    console.log(req.body);
    
   const SALT_ROUND =10;  
   let hasshedPassword = bcrypt.hashSync(req.body.password,SALT_ROUND);
   console.log("ddd", hasshedPassword);
  req.body.password= hasshedPassword;
  
  console.log(req.body);
   
    users.create(req.body)
    .then(users => res.send(users))
    .catch(err => res.status(500).send(err));
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
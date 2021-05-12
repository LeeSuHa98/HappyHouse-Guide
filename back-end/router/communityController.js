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
router.post('/detail', (req, res) => {

    const id = req.body._id;
    communitys.findOneById(id)    
    .then((communitys) => {

      if (!communitys) return res.status(404).send({ err: 'communitys not found' });
      res.send({communitys});
    })
    .catch(err => res.status(500).send(err));
});

// Create new document
router.post('/', (req, res) => {
    
    const groupId = req.body.groupId;
    req.body.groupId= groupId;  
    communitys.create(req.body)
    .then(communitys => res.send(communitys))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.post('/update', (req, res) => {
    console.log('수정받은커뮤니티',req.body);
    communitys.findOneAndUpdate({_id: req.body._id},{    
      title: req.body.title,
      content: req.body.content
    } 
  ).then(communitys => res.send(communitys))
  .catch(err => res.status(500).send(err));
      
  });
// Delete by id
router.post('/delete', (req, res) => {
    var id = req.body._id;
    communitys.deleteOne({_id: id})
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
const router = require('express').Router();
const noticeInfo = require('../model/noticeInfo');

// Find All
router.get('/', (req, res) => {
    noticeInfo.findAll()
    .then((noticeInfo) => {
      if (!noticeInfo.length) return res.status(404).send({ err: 'noticeInfo not found' });
      res.send({noticeInfoList : noticeInfo});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/:id', (req, res) => {
    noticeInfo.findOneById(req.params.id)
    .then((noticeInfo) => {
      if (!noticeInfo) return res.status(404).send({ err: 'noticeInfo not found' });
      res.send({noticeInfo});
    })
    .catch(err => res.status(500).send(err));
});


module.exports = router;
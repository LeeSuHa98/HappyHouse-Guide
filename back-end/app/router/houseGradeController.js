const router = require('express').Router();
const HouseGrade = require('../model/houseGrade');

router.get('/:danjiCode', (req, res) => {
    HouseGrade.findByCode(req.params.danjiCode)
    .then((grade) => {
      if (!grade) return res.status(404).send({ err: 'houseGrade not found' });
      res.send({grade});
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
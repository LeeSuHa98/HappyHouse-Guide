const router = require('express').Router();
const HouseInfo = require('../model/houseInfo');
const HouseInfo2 = require('../model/houseInfo2');

router.get('/address',(req, res) => {
  console.time("address")
  HouseInfo2.findAll()
  .then((houseInfo) => {
    if (!houseInfo.length) return res.status(404).send({ err: 'HouseInfo not found' });
    res.send({houseInfoList : houseInfo});
  })
  .catch(err => res.status(500).send(err));
  console.timeEnd("address")
});

// Find All
router.get('/', (req, res) => {
  console.time("all")
    HouseInfo.findAll()
    .then((houseInfo) => {
      if (!houseInfo.length) return res.status(404).send({ err: 'HouseInfo not found' });
      res.send({houseInfoList : houseInfo});
    })
    .catch(err => res.status(500).send(err));
    console.timeEnd("all")
});

// Find One by todoid
router.get('/:sidoCode', (req, res) => {
    HouseInfo.findBySidoCode(req.params.sidoCode)
    .then((houseInfo) => {
      if (!houseInfo) return res.status(404).send({ err: 'houseInfo not found' });
      res.send({houseInfo});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/:sidoCode/:sigunguCode', (req, res) => {
    HouseInfo.findBySidoCodeAndSigunguCode(req.params.sidoCode, req.params.sigunguCode)
    .then((houseInfo) => {
      if (!houseInfo) return res.status(404).send({ err: 'houseInfo not found' });
      res.send({houseInfo});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/:sidoCode/:sigunguCode/:danjiCode', (req, res) => {
    HouseInfo.findBySidoCodeAndSigunguCodeAndDanjiCode(req.params.sidoCode, req.params.sigunguCode, req.params.danjiCode)
    .then((houseInfo) => {
      if (!houseInfo) return res.status(404).send({ err: 'houseInfo not found' });
      res.send({houseInfo});
    })
    .catch(err => res.status(500).send(err));
});
router.post('/detail', (req, res) => { //거주후기 주택정보
  console.log(req.body.danjiCode);
  HouseInfo.findByDanjiCode(req.body.danjiCode)
  .then((houseInfo) => {
    if (!houseInfo) return res.status(404).send({ err: 'houseInfo not found' });
    res.send({houseInfo});
  })
  .catch(err => res.status(500).send(err));
});
// Create new todo document
router.post('/', (req, res) => {
    HouseInfo.create(req.body)
    .then(houseInfo => res.send(houseInfo))
    .catch(err => res.status(500).send(err));
});

// Update by todoid
router.put('/:id', (req, res) => {
    HouseInfo.updateById(req.params.id, req.body)
    .then(houseInfo => res.send(houseInfo))
    .catch(err => res.status(500).send(err));
});

// Delete by todoid
router.delete('/:id', (req, res) => {
    HouseInfo.deleteById(req.params.id)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
const router = require('express').Router();
const reviews = require('../model/reviews');
const path = require("path");
const fs = require('fs');


const upload = require('../modules/multer');

   router.post('/', upload.single('myImage'),(req,res,next)=>{
 
     let review = new reviews({
      danjiCode: req.body.danjiCode,
      danjiName: req.body.danjiName,
      userId: req.body.userId,
      region: req.body.region,
      typeName: req.body.typeName,
      houseType: req.body.houseType,
      monthlyRentCharge: req.body.monthlyRentCharge,
      adminCharge: req.body.adminCharge,
      title: req.body.title,
      merit: req.body.merit,
      demerit: req.body.demerit,
      writeDate: req.body.writeDate,
      picture: req.file.location, 
      star: req.body.star,
    });
    review.save()
    .then((result) => {
      res.status(201).json(result);
  });
   })

   //NO FILE CREATE REVIEW
   router.post('/create', (req, res) => {
 
    let review = new reviews({
     danjiCode: req.body.danjiCode,
     danjiName: req.body.danjiName,
     userId: req.body.userId,
     region: req.body.region,
     typeName: req.body.typeName,
     houseType: req.body.houseType,
     monthlyRentCharge: req.body.monthlyRentCharge,
     adminCharge: req.body.adminCharge,
     title: req.body.title,
     merit: req.body.merit,
     demerit: req.body.demerit,
     writeDate: req.body.writeDate,
     picture: "https://carrykimsbucket.s3.amazonaws.com/1622914183566.gif",
     star: req.body.star,
   });
   review.save()
   .then((result) => {
     res.status(201).json(result);
 });
  })
// review all count
router.get('/', (req, res) => { 

    reviews.find()
    .then((reviews) => {
      if (!reviews.length) return res.status(404).send({ err: 'reviews not found' });
      res.send({count : reviews.length});
    
    })
    .catch(err => res.status(500).send(err));
});

// Find All
router.post('/date', (req, res) => {
  const pageNumber = req.body.page;

    reviews.findOrderByDate(pageNumber)
    .then((reviews) => {
      if (!reviews.length) return res.status(404).send({ err: 'reviews not found' });
      res.send({reviewList : reviews});
    
    })
    .catch(err => res.status(500).send(err));
});


router.post('/star', (req, res) => { 
  const pageNumber = req.body.page;
  reviews.findOrderByStar(pageNumber)
  .then((reviews) => {
    if (!reviews.length) return res.status(404).send({ err: 'reviews not found' });
    res.send({reviewList : reviews});
  
  })
  .catch(err => res.status(500).send(err));
});

// Find One by id
router.get('/:id', (req, res) => {
    reviews.findOneById(req.params.id)
    .then((reviews) => {
      if (!reviews) return res.status(404).send({ err: 'reviews not found' });
      res.send({reviews});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/houseid/:id', (req, res) => {
  reviews.find({danjiCode: req.params.id})
  .then((reviews) => {
    if (!reviews) return res.status(404).send({ err: 'reviews not found' });
    res.send({reviews});
  })
  .catch(err => res.status(500).send(err));
});

router.get('/userid/:id', (req, res) => {
    reviews.findByUserId(req.params.id)
    .then((reviews) => {
      if (!reviews) return res.status(404).send({ err: 'reviews not found' });
      res.send({reviews});
    })
    .catch(err => res.status(500).send(err));
});

router.get('/:houseid/:userid', (req, res) => {
    reviews.findByUserIdAndHouseId(req.params.houseid,req.params.userid)
    .then((reviews) => {
      if (!reviews) return res.status(404).send({ err: 'reviews not found' });
      res.send({reviews});
    })
    .catch(err => res.status(500).send(err));
});


router.get('/houseid/:id/lastThree', (req, res) => {
  reviews.findOrderOfThree(req.params.id)
  .then((reviews) => {
    if (!reviews) return res.status(404).send({ err: 'reviews not found' });
    res.send({reviews});
  })
  .catch(err => res.status(500).send(err));
});

router.get('/houseid/:id/onlyPicture', (req, res) => {
  reviews.findPictures(req.params.id)
  .then((reviews) => {
    if (!reviews) return res.status(404).send({ err: 'reviews not found' });
    res.send({reviews});
  })
  .catch(err => res.status(500).send(err));
});

// Find One by id
router.post('/detail', (req, res) => {
  
  const id = req.body._id;
  reviews.findOneById(id)    
  .then((reviews) => {

    if (!reviews) return res.status(404).send({ err: 'reviews not found' });
    res.send({reviews});
  })
  .catch(err => res.status(500).send(err));
});

// Update by id
router.post('/update',  upload.single('myImage'),(req,res,next)=> {
 
  reviews.findOneAndUpdate({_id: req.body._id},{    
    title: req.body.title,
    region : req.body.region,
    typeName: req.body.typeName,
    monthlyRentCharge: req.body.monthlyRentCharge,
    adminCharge: req.body.adminCharge,    
    merit : req.body.merit,
    demerit: req.body.demerit,
    picture: req.file.location,
    star: req.body.star
  } 
).then(reviews => res.send(reviews))
.catch(err => res.status(500).send(err));
    
});
// Update No file by id 
router.post('/updateNofile', (req, res) => {
 
  reviews.findOneAndUpdate({_id: req.body._id},{    
    title: req.body.title,
    region : req.body.region,
    typeName: req.body.typeName,
    monthlyRentCharge: req.body.monthlyRentCharge,
    adminCharge: req.body.adminCharge,    
    merit : req.body.merit,
    demerit: req.body.demerit,
    picture: req.body.picture,
    star: req.body.star
  } 
).then(reviews => res.send(reviews))
.catch(err => res.status(500).send(err));
    
});
// Delete by id
router.post('/delete', (req, res) => {
  var id = req.body._id;
    reviews.deleteOne({_id: id})
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
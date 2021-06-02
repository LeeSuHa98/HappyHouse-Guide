const router = require('express').Router();
const reviews = require('../model/reviews');
 const path = require("path");
   const multer = require("multer");
   const fs = require('fs');

   const storage = multer.diskStorage({   //이미지형식으로 바꿔주는역할 
    destination: "./uploads/",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
 });
   const upload =multer({storage: storage});
   
   router.post('/', upload.single('myImage'),(req,res,next)=>{
 
     let image = 'http://localhost:8080/Image/' + req.file.filename;

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
      picture: image, //  <- ./uploads 파일에 저장되어있는 이미지 고유name
      star: req.body.star,
    });
    review.save()
    .then((result) => {
      res.status(201).json(result);
  });
   })

   //NO FILE CREATE REVIEW
   router.post('/create', (req, res) => {
 
    console.log("받은거",req.body)
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
     picture: 0, //  
     star: req.body.star,
   });
   review.save()
   .then((result) => {
     res.status(201).json(result);
 });
  })
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
// router.post('/create', upload.single('profile_img'), function (req, res, next) {
//   console.log(req.body);
//   console.log(req.file);
//   console.log(req.file.filename);
// })

// Update by id
router.post('/update',  upload.single('myImage'),(req,res,next)=> {
  let image = 'http://localhost:8080/Image/' + req.file.filename;
  reviews.findOneAndUpdate({_id: req.body._id},{    
    title: req.body.title,
    region : req.body.region,
    typeName: req.body.typeName,
    monthlyRentCharge: req.body.monthlyRentCharge,
    adminCharge: req.body.adminCharge,    
    merit : req.body.merit,
    demerit: req.body.demerit,
    picture: image,
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
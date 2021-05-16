const router = require('express').Router();
const reviews = require('../model/reviews');
 const path = require("path");
   const multer = require("multer");
   const fs = require('fs');

   const upload =multer({dest: 'uploads/'});

   router.post('/', upload.single('myImage'),(req,res,next)=>{
     console.log('파일 업로드');
     console.log(req.body);
     console.log(req.file);
     
   })
// const storage = multer.diskStorage({
//    destination: "./public/uploads/",
//    filename: function(req, file, cb){
//       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//    }
// });

// const upload = multer({
//    storage: storage,
//    limits:{fileSize: 1000000},
// }).array('myImage');



// router.post("/upload", (req, res) => {
//   upload(req, res, (err) => {
//      console.log("Request ---", req.body);
//      console.log("Request file ---", req.file);//Here you get file.
//      /*Now do where ever you want to do*/
//      if(!err)
//         return res.send(200).end();
//   });
// });

// Create new document
// router.post('/', (req, res) => {
//   console.log('받은거',req.body);  
//   reviews.create(req.body)
//   .then(reviews => res.send(reviews))
//     .catch(err => res.status(500).send(err));
    
// });


// Find All
router.get('/', (req, res) => {
    reviews.findAll()
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
    reviews.findByHouseId(req.params.id)
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
router.post('/update', (req, res) => {
  console.log('수정받은거주후기',req.body);
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
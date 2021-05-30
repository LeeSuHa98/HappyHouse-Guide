const router = require('express').Router();
const communitys = require('../model/community');

// Find All
router.get('/', (req, res) => {
  communitys.find({replyStep: 0}).sort({writeDate :-1 })
    .then((communitys) => {
      if (!communitys.length) return res.status(404).send({ err: 'communitys not found' });
      res.send({communitysList : communitys});
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
router.post('/detail', (req, res) => {
   // console.log('작동');
    const id = req.body._id;
    communitys.findOneById(id)    
    .then((communitys) => {
   //   console.log(communitys);
      if (!communitys) return res.status(404).send({ err: 'communitys not found' });
      res.send({communitys});
    })
    .catch(err => res.status(500).send(err));
});
router.post('/reply', (req, res) => {  //댓글 조회

  const groupId = req.body.groupId;
 // communitys.find({ groupId: req.body.groupId } ,{replyStep: 1})    
 communitys.find({replyStep: 1, groupId: req.body.groupId})
  .then((communitys) => {

    if (!communitys) return res.status(404).send({ err: 'communitys not found' });
    res.send({communitysList : communitys});
  })
  .catch(err => res.status(500).send(err));
});
// Create new community
router.post('/', (req, res) => {
    
    const groupId = req.body.writeDate;

    req.body.groupId= groupId;  
      communitys.create(req.body)
      .then(communitys => res.send(communitys))
      .catch(err => res.status(500).send(err));
});
// Create new reply
router.post('/create', (req, res) => {
    

    communitys.create(req.body)
    .then(communitys => res.send(communitys))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.post('/update', (req, res) => {
    communitys.findOneAndUpdate({_id: req.body._id},{    
      title: req.body.title,
      content: req.body.content
    } 
  ).then(communitys => res.send(communitys))
  .catch(err => res.status(500).send(err));
      
  });
// Delete by id
router.post('/delete', (req, res) => {
 
  console.log(req.body)
    var id = req.body._id;
    if(req.body.userId == req.body.writeId){
      communitys.deleteOne({_id: id})
      .then(() => res.send("게시글 삭제 완료"))
      .catch(err => res.status(500).send(err));
    }else{
      res.send("삭제할 권한이 없습니다.");
    }
   
});

module.exports = router;
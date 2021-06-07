const router = require('express').Router();
const users = require('../model/users');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const YOUR_SECRET_KEY = "happyhouse"

router.post('/', (req, res) => {
    console.log(req.body.userID, req.body.password)
    users.findUserForLogin(req.body.userID, req.body.password)
    .then(users =>{
        console.log(users[0].userID)
        console.log(users[0].password) //db에 저장된 해시비밀번호
        const check =bcrypt.compareSync(req.body.password,users[0].password);
        console.log(check);
        
        if(check ==true){
            const token = jwt.sign({userID: users[0].userID}, YOUR_SECRET_KEY, {expiresIn: '1h'});
            res.send({ token : token, userID : users[0].userID, name : users[0].name, phoneNum : users[0].phoneNum})
        }else{
            res.status(400).json({ error: 'invalid user' });
        }
    
    
    }).catch(err => res.status(500).send(err));
    // users.findUserForLogin(req.body.userID, req.body.password)
    // .then(users => {
    //     console.log(users[0].userID)
    //     if (users[0].userID) {
    //          const token = jwt.sign({userID: users[0].userID}, YOUR_SECRET_KEY, {expiresIn: '1h'});
    //          res.send({ token : token, userID : users[0].userID, name : users[0].name, phoneNum : users[0].phoneNum})
    //     }else{
    //         res.status(400).json({ error: 'invalid user' });
    //     }
            
    // })
    // .catch(err => res.status(500).send(err));
});

module.exports = router;
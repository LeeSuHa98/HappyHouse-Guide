const router = require('express').Router();
const users = require('../model/users');
const jwt = require('jsonwebtoken');

const YOUR_SECRET_KEY = "happyhouse"

router.post('/', (req, res) => {
    console.log(req.body.userID, req.body.password)
    users.findUserForLogin(req.body.userID, req.body.password)
    .then(users => {
        console.log(users[0].userID)
        if (users[0].userID) {
             const token = jwt.sign({userID: users[0].userID}, YOUR_SECRET_KEY, {expiresIn: '1h'});
             res.send({ token : token, name : users[0].name})
        }else{
            res.status(400).json({ error: 'invalid user' });
        }
            
    })
    .catch(err => res.status(500).send(err));
});

module.exports = router;
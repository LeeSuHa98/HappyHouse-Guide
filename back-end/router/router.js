const router = require('express').Router();

router.use('/houseInfos', require('./houseInfoController'));
router.use('/reviews', require('./reviewsController'));
router.use('/users', require('./userController'));
router.use('/FAQs', require('./FAQController'));
router.use('/communities', require('./communityController'));
router.use('/dibs', require('./dibsController'));

module.exports = router;
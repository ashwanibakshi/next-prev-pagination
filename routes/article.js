const express          =  require('express');
const articleCont      =  require('../controller/articleController');

const router =  express.Router();

router.get('/home',articleCont.home);
router.get('/article/:id',articleCont.article);

module.exports = router;
/**
* @since  : 2019.09.03
* @auther : 이정열
* @file_Comment : 공통 로직 호출 라우터
* ----------------------
* 개정이력
* 2019.08.20 : 최초작성
*/

var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');
var usersModule = require('../modules/CommonModule');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', function(req, res, next){
    router.use('/', usersModule);
    next('route')
});

//post 테스트
router.post('/', (req, res, next) => {
    router.use('/', usersModule);
    next('route')
});

module.exports = router;
/**
* @since  : 2019.09.23
* @auther : 이정열
* @file_Comment : Sw tools 라우터
* ----------------------
* 개정이력
* 2019.09.23 : 최초작성
*/

var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var usersModule = require('../modules/SwtoolModule');

/**
* @Auther : 이정열
* @Date   : 2019.09.23
* @Method_Comment : SWTools
* @Param : type 
* @return : Swtool 정
* type에 따라 module 분기처리
*/
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
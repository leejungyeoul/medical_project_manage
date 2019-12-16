/**
* @since  : 2019.09.03
* @auther : 이정열
* @file_Comment : 서브코드 조회 라우터
* ----------------------
* 개정이력
* 2019.08.20 : 최초작성
*/

var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var usersModule = require('../modules/CommonModule');


/**
* @Auther : 이정열
* @Date   : 2019.09.03
* @Method_Comment : 서브코드 조회
* @Param : type(is_Subcode) 
* @return : 서브코드 정보
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
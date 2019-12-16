/**
* @since  : 2019.09.04
* @auther : 이정열
* @file_Comment : Research project 라우터
* ----------------------
* 개정이력
* 2019.09.04 : 최초작성
*/

var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var usersModule = require('../modules/ResrchpjtModule');


/**
* @Auther : 이정열
* @Date   : 2019.09.04
* @Method_Comment : Research project
* @Param : type(is_Pjt_code) 
* @return : Research project info
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
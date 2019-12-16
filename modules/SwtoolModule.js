/**
* @since  : 2019.09.04
* @auther : 이정열
* @file_Comment : Swtool 모듈
* ----------------------
* 개정이력
* 2019.09.04 : 최초작성
*/

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/**
* @Auther : 이정열
* @Date   : 2019.09.04
* @Method_Comment : Swtool 조회
* @Param : type(is_Pjt_code) 
* @return : Swtool
*/
router.post('/', (req, res, next) => {
  var m_typ = req.query.type;
  if(m_typ == 'list'){
    //Swtool 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSwToolsList';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'info' || m_typ == 'funclist'){
    //Swtool 정보 조회
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectSwToolsInfo';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
  }else if(m_typ == 'listCount'){
    //Swtool 정보 Count 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSwToolsListCount';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'save'){
    //Swtool 관리자 저장
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertSwToolsInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'modify'){
    //Swtool 관리자 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSwToolsInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'delbefore'){
    //Swtool 관리자 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteSwToolsInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'geturl'){
    //Swtool 관리자 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSwToolsUrl';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'update_url'){
    //Swtool 관리자 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'SwToolsMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSwToolsUrl';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }

 
});

module.exports = router;
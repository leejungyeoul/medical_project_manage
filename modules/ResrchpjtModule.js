/**
* @since  : 2019.09.04
* @auther : 이정열
* @file_Comment : Research project 모듈
* ----------------------
* 개정이력
* 2019.09.04 : 최초작성
*/

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/**
* @Auther : 이정열
* @Date   : 2019.09.04
* @Method_Comment : Research project 조회/수정/삭제
* @Param : type(is_Pjt_code) 
* @return : Research project info
*/
router.post('/', (req, res, next) => {
  var m_typ = req.query.type;
  if(m_typ == 'list'){
    //Research Projects 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectResrchpjtList';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'count'){
    //Research Projects 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectResrchpjtCount';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'detail'){
    //Research Projects 상세 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectResrchpjtInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'prtipant'){
    //Research Projects 상세 공동연구자 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectParticipantInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'datasrce'){
    //Research Projects 상세 datasource 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectDataSourceInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'SWtool'){
    //Research Projects 상세 SWtool 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSWtoolInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'uploadfile'){
    //Research Projects 상세 연구파일 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectUploadFileInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }

  // 댓글정보 조회/삽입/삭제
  if(m_typ == 'read_reply'){
    //댓글 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectReplyList';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'save_reply'){
        //댓글 insert
        try {
          // Mysql Api 모듈(CRUD)
          var dbconnect_Module = require('./dbconnect_Module');
      
          //Mysql 쿼리 호출정보 입력
          req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
          req.body.crud = 'insert';//select, insert, update, delete 중에 입력
          req.body.mapper_id = 'insertReplyinfo';
          
          router.use('/', dbconnect_Module);
          next('route')
        } catch (error) {
          console.log("Module > dbconnect error : "+ error);      
        }
  }else if(m_typ == 'delete_reply'){
    //댓글 insert
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteReplyinfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'update_prticipt'){
    //댓글 insert
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'ResrchpjtMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updatePartiStatus';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }

 
});

module.exports = router;
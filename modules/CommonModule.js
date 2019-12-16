/**
* @since  : 2019.09.03
* @auther : 이정열
* @file_Comment : 공통코드호출 모듈
* ----------------------
* 개정이력
* 2019.09.03 : 최초작성
*/

var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

var openurl = require('openurl');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


/**
* @Auther : 이정열
* @Date   : 2019.09.03
* @Method_Comment : 서브코드 조회
* @Param : type(is_Subcode) 
* @return : 서브코드 정보
*/
router.get('/', function(req, res, next){
  var m_typ = req.query.type;
  if(m_typ == 'response_Softwaretool'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'UserMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteSessionToken';
      req.body.is_Token = req.query.is_Token

      console.log("response_Softwaretool Success");    
      console.log(" is_Token : "+req.query.is_Token  );      
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }
});

router.post('/', (req, res, next) => {
  var m_typ = req.query.type;
  if(m_typ == 'system'){
    //시스템 변수 호출
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSystem';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }


  //연동사이트에서 처리  
  }else if(m_typ == 'session'){
      console.log(" is_Token : "+req.body.is_Token);      
      // openurl.open("http://localhost:3000/community/notice")
      res.send("succ");


  }else if(m_typ == 'mstcode'){
      //Mst 코드 리스트 조회
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'CommonMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectMstcode';
    
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
  }else if(m_typ == 'doubleCheck'){
    //Mst 코드 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSubcode2';
  
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
}else if(m_typ == 'InsertMst'){
    //MstCode 저장
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertMstCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'InsertSub'){
    //SubCode 저장
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertSubCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }

  }else if(m_typ == 'update'){
    //MstCode 저장
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateMstCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
    //SubCode 저장
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSubCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }

  }else if(m_typ == 'deleteSub'){
    //SubCode 삭제
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteSubCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'deleteMst'){
    //MSTCode 삭제
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deleteMstCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  
  }else if(m_typ == 'log'){
    //MSTCode 삭제
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'CommonMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertLogInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  
  }else{
      //Sub 코드 리스트 조회
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'CommonMapper';//mybatis xml 파일명
        req.body.crud = 'select';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'selectSubcode';
    
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
  }
 
});

module.exports = router;
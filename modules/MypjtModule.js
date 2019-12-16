/**
* @since  : 2019.09.03
* @auther : 이정열
* @file_Comment : 마이프로젝트 모듈
* ----------------------
* 개정이력
* 2019.09.03 : 최초작성
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
* @Date   : 2019.09.03
* @Method_Comment : 마이프로젝트
* @Param : type(is_Pjt_code) 
* @return : 마이프로젝트 정보
*/
router.post('/', (req, res, next) => {
  var m_typ = req.query.type;

  if(m_typ == 'resrcher'){
    //Researcher 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectResearcherList';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'datasrce'){
    //Data source 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectDataSourceList';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'swtool'){
    //Data source 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectSwtoolList';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }
  // else{//사용X
  //   try {
  //     // Mysql Api 모듈(CRUD)
  //     var dbconnect_Module = require('./dbconnect_Module');
  
  //     //Mysql 쿼리 호출정보 입력
  //     req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
  //     req.body.crud = 'select';//select, insert, update, delete 중에 입력
  //     req.body.mapper_id = 'selectMypjtList';
  
  //     router.use('/', dbconnect_Module);
  //     next('route')
  //   } catch (error) {
  //     console.log("Module > dbconnect error : "+ error);      
  //   }
  // }


  if(m_typ == 'save'){
    //Researcher 리스트 조회
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertProjectInfo';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'dsInsert'){
    
    for(var i=0 ; i < req.body.arr_DataSourceData.length ; i++){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        req.body.is_DsProjectCd = req.body.arr_DataSourceData[i]
        req.body.is_DsProjectflag = req.body.arr_DataSourceflagData[i]

        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'insert';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'insertUseDataSourceList';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }

  }else if(m_typ == 'SwtInsert'){
    for(var i=0 ; i < req.body.arr_SwtooltData.length ; i++){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        req.body.is_SwtoolCd = req.body.arr_SwtooltData[i]
        req.body.is_SwtoolCdflag = req.body.arr_SwtooltflagData[i]

        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'insert';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'insertUseSoftWareToolList';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
  }else if(m_typ == 'SwtUpdateUrl'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSwtUpdateUrl';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'ptcipantInsert'){
    for(var i=0 ; i < req.body.arr_PtcipantDataEmail.length ; i++){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        req.body.is_PtcipantEmail = req.body.arr_PtcipantDataEmail[i]
        req.body.is_PtcipantName = req.body.arr_PtcipantDataName[i]
        req.body.is_PtcipantFlag = req.body.arr_PtcipantDataFlag[i]

        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'insert';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'insertPtcipantInsertList';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
  }else if(m_typ == 'uploadfile'){
    for(var i=0 ; i < req.body.arr_UploadFile.length ; i++){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        req.body.is_Filename = req.body.arr_UploadFile[i]
        req.body.is_Filedate = req.body.arr_UploadFileDate[i]
        req.body.is_Fileuser = req.body.arr_UploadFileUser[i]

        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'insert';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'insertUploadFilenames';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
  }else if(m_typ == 'update_reply'){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'update';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'updateReplyCode';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
  }else if(m_typ == 'rollback' || m_typ == 'finish_mod'){
    for(var i=0 ; i < req.body.arr_MapperList.length ; i++){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');
    
        req.body.arr_MapperList[i]

        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'delete';//select, insert, update, delete 중에 입력
        req.body.mapper_id = req.body.arr_MapperList[i];
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
    }
  }else if(m_typ == 'parti_cencel'){
      try {
        // Mysql Api 모듈(CRUD)
        var dbconnect_Module = require('./dbconnect_Module');

        //Mysql 쿼리 호출정보 입력
        req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
        req.body.crud = 'delete';//select, insert, update, delete 중에 입력
        req.body.mapper_id = 'deleteParticipantinfo';
        
        router.use('/', dbconnect_Module);
        next('route')
      } catch (error) {
        console.log("Module > dbconnect error : "+ error);      
      }
  }else if(m_typ == 'Postpone'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'select';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'selectPostponeperiod';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'PostponeSave'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'insert';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'insertPostponeperiod';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'update_postpone'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updatePostponeCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'PostponeDelete'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'delete';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'deletePostponeCode';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }
  
  // 어드민
  if(m_typ == 'DsApproval'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateDsApproval';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'SwApproval'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateSwApproval';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'PostApproval'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updatePostApproval';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'updatePjtStatus'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updatePjtStatus';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }else if(m_typ == 'updateOriginPeriod'){
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require('./dbconnect_Module');
  
      //Mysql 쿼리 호출정보 입력
      req.body.mapper = 'MyProjectMapper';//mybatis xml 파일명
      req.body.crud = 'update';//select, insert, update, delete 중에 입력
      req.body.mapper_id = 'updateOriginPeriod';
      
      router.use('/', dbconnect_Module);
      next('route')
    } catch (error) {
      console.log("Module > dbconnect error : "+ error);      
    }
  }

});

module.exports = router;
var express = require('express');
var router = express.Router();
var cron = require('node-cron');
var fs = require('fs');
var Folder = './uploads';
const axios = require('axios');
var ip = require('ip');

//매일 자정 프로젝트 종료처리
cron.schedule('0 0 * * *', () => {

  var mapper = 'CommonMapper';//mybatis xml 파일명
  var crud = 'update';//select, insert, update, delete 중에 입력
  var mapper_id = 'updateFinishedPjtList';

  console.log('#######  배치 실행 / 매일 자정 프로젝트 종료처리 #######');

  const mysql = require('mysql');
  const mybatisMapper = require('mybatis-mapper');

    //my sql 접속 정보 AWS
    const connection = mysql.createConnection({
      // host: 'localhost',
      host: '*******************.ap-northeast-2.rds.amazonaws.com',
      user: 'rtrod_user',
      port: '3306',
      // database: '데이터베이스명칭',
      password: '**************'
    });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml']);
    var time1 = new Date();
    console.log('## '+time1+ ' ##');
    console.log("\n Called Mapper Name  = "+mapper);

    //질의문 형식
    var format = { language: 'sql', indent: '  ' };
    var query = mybatisMapper.getStatement(mapper, mapper_id, null, format);
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log("* mapper namespce : "+mapper+"."+mapper_id+" *\n");
    console.log(query+"\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {  //조회
      if (error) {
        console.log("db error************* : "+error);
        batch_log('BC1', '프로젝트 종료처리',  error)
      }
      var time2 = new Date();
      console.log('## '+time2+ ' ##');
      console.log('## RESULT DATA LIST ## : \n', results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);

      batch_log('BC1', '프로젝트 종료처리',  string)

      console.log("========= Node Mybatis Query Log End =========\n");
    });

    connection.end();
  
});

//매일 자정 프로젝트 종료처리
cron.schedule('5 0 * * *', () => {

  var mapper = 'CommonMapper';//mybatis xml 파일명
  var crud = 'select';//select, insert, update, delete 중에 입력
  var mapper_id = 'selectFinishedPjtList';

  console.log('#######  배치 실행 / 매일 자정 프로젝트 종료처리완료 #######');

  const mysql = require('mysql');
  const mybatisMapper = require('mybatis-mapper');

  const connection = mysql.createConnection({
    // host: 'localhost',
    host: '*******************.ap-northeast-2.rds.amazonaws.com',
    user: 'rtrod_user',
    port: '3306',
    // database: '데이터베이스명칭',
    password: '**************'
  });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml']);
    var time1 = new Date();
    console.log('## '+time1+ ' ##');
    console.log("\n Called Mapper Name  = "+mapper);

    //질의문 형식
    var format = { language: 'sql', indent: '  ' };
    var query = mybatisMapper.getStatement(mapper, mapper_id, null, format);
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log("* mapper namespce : "+mapper+"."+mapper_id+" *\n");
    console.log(query+"\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {  //조회
      if (error) {
        console.log("db error************* : "+error);
      }
      var time2 = new Date();
      console.log('## '+time2+ ' ##');
      console.log('## RESULT DATA LIST ## : \n', results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);

      var home_url = ''
      if(ip.address() == '172.17.0.2'){
        home_url = 'http://15.164.5.237:5000'
      }else{//운영서버 ip가 아닌 경우 모두 로컬처리
        home_url = 'http://localhost:5000'
      }
      console.log('json.length : '+json.length)
      for(var i=0; i<json.length ; i++){
        var pjt_code = json[i].pjt_code
        var pjtname = json[i].pjt_name
        var pjt_owner = json[i].pjt_owner
        batch_log('BC11', '프로젝트 종료처리완료 프로젝트 코드 : '+pjt_code+' 프로젝트명 : '+pjtname+' 책임연구자 : '+pjt_owner,  error)
      }

      console.log("========= Node Mybatis Query Log End =========\n");
    });

    connection.end();
  
});


//매일 새벽3시 프로젝트 불필요한 업로드파일 삭제
cron.schedule('0 3 * * *', () => {

  var mapper = 'CommonMapper';//mybatis xml 파일명
  var crud = 'select';//select, insert, update, delete 중에 입력
  var mapper_id = 'selectfilelist';

  console.log('#######  배치 실행  / 매일 새벽3시 프로젝트 불필요한 업로드파일 삭제#######');
  
  fs.readdir(Folder, function(error, filelist){
    batch_exec(mapper, crud, mapper_id, filelist)
  })
});

function batch_exec(mapper, crud, mapper_id, filelist){
    const mysql = require('mysql');
    const mybatisMapper = require('mybatis-mapper');

    const connection = mysql.createConnection({
      // host: 'localhost',
      host: '*******************.ap-northeast-2.rds.amazonaws.com',
      user: 'rtrod_user',
      port: '3306',
      // database: '데이터베이스명칭',
      password: '**************'
    });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml']);
    var time1 = new Date();
    console.log('## '+time1+ ' ##');
    console.log("\n Called Mapper Name  = "+mapper);

    //질의문 형식
    var format = { language: 'sql', indent: '  ' };
    var query = mybatisMapper.getStatement(mapper, mapper_id, null, format);
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log("* mapper namespce : "+mapper+"."+mapper_id+" *\n");
    console.log(query+"\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {  //조회
      if (error) {
        console.log("db error************* : "+error);
      }
      var time2 = new Date();
      console.log('## '+time2+ ' ##');
      console.log('## RESULT DATA LIST ## : \n', results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);
      if(json.length > 0){
        console.log('filelist.size() : '+filelist.length+' filelist[0] :'+filelist[0]);
        console.log('json.size() : '+json.length+' filelist[0] :'+json[0].file_name);
  
        for(var i=0 ; i<filelist.length; i++){
          for(var j=0 ; j<json.length; j++){
            if(filelist[i] == json[j].file_name){
              filelist[i] = ''
              console.log('file_name : '+json[j].file_name);
            }
          }
        }
        var tmpstring = ''
        for(var i=0 ; i<filelist.length; i++){
          if(filelist[i] != '' && filelist[i] != 'image' && filelist[i] != 'swmanual'){
            tmpstring = tmpstring + filelist[i] +','
            fs.unlink('uploads/'+filelist[i], function (err) {
              if (err){
                batch_log('BC2', '불필요한 파일 삭제', err)
                throw err;
              }
            });
          }
        }
        batch_log('BC2', '불필요한 파일 삭제', tmpstring)
      }

      console.log("========= Node Mybatis Query Log End =========\n");
    });

    connection.end();
}

//매일 자정 연구기간이 2일 남은 회원에게 알림, 메일 발송
cron.schedule('0 0 * * *', () => {

  var mapper = 'MyProjectMapper';//mybatis xml 파일명
  var crud = 'select';//select, insert, update, delete 중에 입력
  var mapper_id = 'selectMypjt2DayBeforeList';

  console.log('#######  배치 실행 / 매일 자정 프로젝트 종료처리 #######');

  const mysql = require('mysql');
  const mybatisMapper = require('mybatis-mapper');

  const connection = mysql.createConnection({
    // host: 'localhost',
    host: '*******************.ap-northeast-2.rds.amazonaws.com',
    user: 'rtrod_user',
    port: '3306',
    // database: '데이터베이스명칭',
    password: '**************'
  });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml']);
    var time1 = new Date();
    console.log('## '+time1+ ' ##');
    console.log("\n Called Mapper Name  = "+mapper);

    //질의문 형식
    var format = { language: 'sql', indent: '  ' };
    var query = mybatisMapper.getStatement(mapper, mapper_id, null, format);
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log("* mapper namespce : "+mapper+"."+mapper_id+" *\n");
    console.log(query+"\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {  //조회
      if (error) {
        console.log("db error************* : "+error);
      }
      var time2 = new Date();
      console.log('## '+time2+ ' ##');
      console.log('## RESULT DATA LIST ## : \n', results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);

      var home_url = ''
      if(ip.address() == '172.17.0.2'){
        home_url = 'http://15.164.5.237:5000'
      }else{//운영서버 ip가 아닌 경우 모두 로컬처리
        home_url = 'http://localhost:5000'
      }
      console.log('json.length : '+json.length)
      for(var i=0; i<json.length ; i++){
        var pjtname = json[i].pjt_name
        //연구기간 이틀전 알림전송
        axios.post(home_url+'/api/message?type=push', {
          is_Receiver : json[i].pjt_owner_email,
          is_Message : json[i].pjt_name+'의 연구기간이 이틀 남았습니다.',
          is_Pjtcode : json[i].pjt_code
        })
        .then( response => {
          console.log('succ1')
        })
        .catch( response => {console.log('fail1'+response)} ); 
        batch_log('BC3', '프로젝트 연구기간 연장 알림',  pjtname)
  
        //연구기간 이틀전 이메일발송
        axios.post(home_url+'/api/message?type=email&roll=2daybefore', {
          is_Email : json[i].pjt_owner_email,
          is_Subject : json[i].pjt_name+'의 연구기간이 이틀 남았습니다.',
          is_Text: json[i].pjt_name+'의 연구기간이 이틀 남았습니다.',
          is_PjtName: json[i].pjt_name
        })
        .then( response => {
          console.log('succ2')
        })
        .catch( response => {console.log('fail2 '+response)});
        batch_log('BC4', '프로젝트 연구기간 연장 이메일',  pjtname)
      }

      console.log("========= Node Mybatis Query Log End =========\n");
    });

    connection.end();

});

function batch_log(batchcode, batchnm, batchlog){
 
  var param = {'is_Batchcode':batchcode, 'is_Batchnm':batchnm , 'is_Batchlog':batchlog}

  var mapper = 'CommonMapper';//mybatis xml 파일명
  var crud = 'insert';//select, insert, update, delete 중에 입력
  var mapper_id = 'insertBatchlog';

  console.log('#######  배치 실행 / 매일 자정 프로젝트 종료처리 #######');

  const mysql = require('mysql');
  const mybatisMapper = require('mybatis-mapper');

  const connection = mysql.createConnection({
    // host: 'localhost',
    host: '*******************.ap-northeast-2.rds.amazonaws.com',
    user: 'rtrod_user',
    port: '3306',
    // database: '데이터베이스명칭',
    password: '**************'
  });

    mybatisMapper.createMapper(['./models/'+mapper+'.xml']);
    var time1 = new Date();
    console.log('## '+time1+ ' ##');
    console.log("\n Called Mapper Name  = "+mapper);

    //질의문 형식
    var format = { language: 'sql', indent: '  ' };
    var query = mybatisMapper.getStatement(mapper, mapper_id, param, format);
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log("* mapper namespce : "+mapper+"."+mapper_id+" *\n");
    console.log(query+"\n");

    connection.connect();
    connection.query(query, function (error, results, fields) {  //조회
      if (error) {
        console.log("db error************* : "+error);
      }
      var time2 = new Date();
      console.log('## '+time2+ ' ##');
      console.log('## RESULT DATA LIST ## : \n', results);

      console.log("========= Node Mybatis Query Log End =========\n");
    });

    connection.end();

}

module.exports = router;
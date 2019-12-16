var express = require('express');
var router = express.Router();
var ip = require('ip');

/**
* @Auther : 이정열
* @Date   : 2019.08.20
* @Method_Comment : Server Home Url 호출
* @Param : 
* @return : Server Home Url(Local, Prod)
*/
router.get('/', function(req, res, next){
  console.log("========= cmPathInfo log =========")
  console.log(" ip : "+ip.address())
  //차후 운영서버 ip로 변경
  if(ip.address() == '10.5.99.49'){
    res.send({ home_url: 'http://10.5.99.49:3000', node_url: 'http://10.5.99.49:5000'});
    console.log("========= Server Type  : Prod =========" )
  }else if(ip.address() == '192.168.130.1'){
    res.send({ home_url: 'http://128.1.99.51:3000', node_url: 'http://128.1.99.51:5000'});
    console.log("========= Server Type  : dev =========" )  
  }else if(ip.address() == '172.17.0.2'){
    res.send({ home_url: 'http://15.164.5.237:3000', node_url: 'http://15.164.5.237:5000'});
    console.log("========= Server Type  : aws =========" )  
  }else{//운영서버 ip가 아닌 경우 모두 로컬처리
    res.send({ home_url: 'http://localhost:3000', node_url: 'http://localhost:5000'});
    console.log("========= Server Type  : Local =========")
  }
});

module.exports = router;
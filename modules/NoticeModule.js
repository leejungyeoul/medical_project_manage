/**
 * @since  : 2019.09.03
 * @auther : 이정열
 * @file_Comment : 공통코드호출 모듈
 * ----------------------
 * 개정이력
 * 2019.09.03 : 최초작성
 */

var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
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
router.post("/", (req, res, next) => {
  var m_typ = req.query.type; //분기처리할때 사용
  if (m_typ === "list") {
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "NoticeMapper"; //mybatis xml 파일명
      req.body.crud = "select"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "selectNoticeList";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (m_typ === "detail") {
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "NoticeMapper"; //mybatis xml 파일명
      req.body.crud = "select"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "selectNoticeDetail";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (m_typ == "modify") {
    //notice 관리자 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "NoticeMapper"; //mybatis xml 파일명
      req.body.crud = "update"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "updateNoticeDetail";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (m_typ == "write") {
    //notice 관리자 수정
    try {
      // Mysql Api 모듈(CRUD)
      var dbconnect_Module = require("./dbconnect_Module");

      //Mysql 쿼리 호출정보 입력
      req.body.mapper = "NoticeMapper"; //mybatis xml 파일명
      req.body.crud = "update"; //select, insert, update, delete 중에 입력
      req.body.mapper_id = "updateNoticeDetail";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
});

module.exports = router;

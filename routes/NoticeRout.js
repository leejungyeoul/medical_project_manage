/**
 * @since  : 2019.08.20
 * @auther : 이정열
 * @file_Comment : 공지사항 라우터
 * ----------------------
 * 개정이력
 * 2019.08.20 : 최초작성
 */

var express = require("express");

var router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var usersModule = require("../modules/NoticeModule");

router.get("/", function(req, res, next) {
  router.use("/", usersModule);
  next("route");
});

//post 테스트
router.post("/", (req, res, next) => {
  router.use("/", usersModule);
  next("route");
});

module.exports = router;

/**
 * @since  : 2019.08.20
 * @auther : 이정열
 * @file_Comment : Db connection Module/ mysql 접속 정보
 * ----------------------
 * 개정이력
 * 2019.08.20 : 최초작성
 */

var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const bodyParser = require("body-parser");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const pool  = mysql.createPool({
  connectionLimit: 66,
  waitForConnections: true,
  host: "*******************.ap-northeast-2.rds.amazonaws.com",
  port: "3306",
  database: 'rtrod',
  user: "rtrod_user",
  password: "**************",
});

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', function (connection) {
  console.log('SET SESSION auto_increment_increment=1');
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

router.post("/", (req, res) => {
  const mybatisMapper = require("mybatis-mapper");

  var param = req.body;
  var m_typ = req.query.type;
  mybatisMapper.createMapper(["./models/" + param.mapper + ".xml"]);
  var time1 = new Date();
  console.log("## " + time1 + " ##");
  console.log("\n Called Mapper Name  = " + param.mapper);
  
  //질의문 형식
  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
    );
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log(
      "* mapper namespce : " + param.mapper + "." + param.mapper_id + " *\n"
      );
      console.log(query + "\n");
      
  try {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query(query, function(error, results) {
      //조회
      var time2 = new Date();
      console.log("## " + time2 + " ##");
      console.log("## RESULT DATA LIST ## : \n", results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);
      
      console.log("========= Node Mybatis Query Log End =========\n");
      // 조회
      try {
        if (req.body.crud == "select") {
          if (param.mapper_id == "selectLoginCheck" && m_typ != "modinfo") {
            if (json[0] == undefined) {
              res.send(null);
            } else {
              bcrypt.compare(req.body.is_Password, json[0].userpassword, function(
                err,
                login_flag
              ) {
                if (login_flag == true) {
                  res.send({ json });
                } else {
                  res.send(null);
                }
              });
            }
          } else {
            res.send({ json });
          }
          //삽입
        } else if (req.body.crud == "insert") {
          res.send("succ");
          //수정
        } else if (req.body.crud == "update") {
          res.send("succ");
          //삭제
        } else if (req.body.crud == "delete") {
          res.send("succ");
        } else {
        }
      } catch (error) {
        // res.send("error");
      }
      connection.release();
  
      if (error) {
        console.log("db error************* : " + error);
        throw error
      }
    });
    })

  } catch (error) {
    console.log("pool error : "+error);
  }
});

//get 호출시 db connetion
router.get("/", (req, res) => {
  const mybatisMapper = require("mybatis-mapper");

  var param = req.body;
  var m_typ = req.query.type;
  mybatisMapper.createMapper(["./models/" + param.mapper + ".xml"]);
  var time1 = new Date();
  console.log("## " + time1 + " ##");
  console.log("\n Called Mapper Name  = " + param.mapper);
  
  //질의문 형식
  var format = { language: "sql", indent: "  " };
  var query = mybatisMapper.getStatement(
    param.mapper,
    param.mapper_id,
    param,
    format
    );
    console.log("\n========= Node Mybatis Query Log Start =========");
    console.log(
      "* mapper namespce : " + param.mapper + "." + param.mapper_id + " *\n"
      );
      console.log(query + "\n");
      
  try {
    pool.getConnection(function(err,connection){
      if (err) throw err;
      connection.query(query, function(error, results) {
      //조회
      var time2 = new Date();
      console.log("## " + time2 + " ##");
      console.log("## RESULT DATA LIST ## : \n", results);
      string = JSON.stringify(results);
      var json = JSON.parse(string);
      
      console.log("========= Node Mybatis Query Log End =========\n");
      // 조회
      try {
        if (req.body.crud == "delete") {
          res.send("succ");
        }
      } catch (error) {
      }
      connection.release();
      if (error) {
        console.log("db error************* : " + error);
        throw error
      }
    });
    })

  } catch (error) {
    console.log("pool error : "+error);
  }
});

module.exports = router;

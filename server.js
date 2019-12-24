/**
 * @since  : 2019.08.20
 * @auther : 이정열
 * @file_Comment : 서버 세팅(포트, 라우팅)
 * ----------------------
 * 개정이력
 * 2019.08.20 : 최초작성
 */

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

var commonRouter = require("./routes/CommonRout");
var usersRouter = require("./routes/UsersRout");
var resrchpjtRout = require("./routes/ResrchpjtRout");
var mypjtRouter = require("./routes/MypjtRout");
var swtoolRouter = require("./routes/SwtoolRout");
var dataSourceRouter = require("./routes/DataSourceRout");
var NoticeRouter = require("./routes/NoticeRout");
var cmpathinfo = require("./config/CmPathInfo");
var fileuploadRouter = require("./routes/UploadRout");
var MessageRoutRouter = require("./routes/MessageRout");
var BatchRout = require("./routes/BatchRout");

//회원가입 정보 입력
app.use("/api/register", usersRouter);

//Server Home url 호출
app.use("/api/cmpathinfo", cmpathinfo);

//로그인 조회
app.use("/api/LoginForm", usersRouter);

//마이 프로젝트
app.use("/api/Myproject", mypjtRouter);

//리서치 프로젝트
app.use("/api/Resrchpjt", resrchpjtRout);

//sw Tool 조회
app.use("/api/Swtool", swtoolRouter);

//DataSource 조회
app.use("/api/DataSource", dataSourceRouter);

//공통코드 조회
app.use("/api/getSubCode", commonRouter);

//시스템 변수 조회
app.use("/api/system", commonRouter);

//파일 업로드
app.use("/api/upload", fileuploadRouter);

//알림, 메일 전송
app.use("/api/message", MessageRoutRouter);

//공지사항
app.use("/api/Notice", NoticeRouter);

//시스템 배치
app.use("/api/BatchRout", BatchRout);

//파일 업로드 경로 설정
app.use(express.static("./uploads"));

app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require("express");
const app = express();
const { OpenVidu } = require("openvidu-node-client");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const multer = require("multer");

dotenv.config({
  path: path.join(path.resolve(), ".env"),
});

const OPENVIDU_URL = process.env.OPENVIDU_URL;
const OPENVIDU_SECRET = process.env.OPENVIDU_SECRET;
console.log(OPENVIDU_URL);
const OV = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
let session = null;
const formDataMiddleWare = multer();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formDataMiddleWare.any());

app.post("/api/openvidu/sessions", async (req, res) => {
  // createSession 하는 부분
  const sessionProperties = req.body;
  console.log("req.body", req.body);
  session = await OV.createSession(sessionProperties);
  res.send(JSON.stringify(session.sessionId));
});

app.post("/api/openvidu/:sessionId/connections", async (req, res) => {
  // createSession 하는 부분
  const sessionProperties = req.body;
  const sessionId = req.params.sessionId;
  console.log(sessionId)
  console.log(sessionProperties);
  const connection = await session.createConnection(sessionProperties);
  res.send(
    JSON.stringify({
      token: connection.token,
    })
  );
});

app.listen(5000, () => {
  console.log("listening on port" + 5000);
});

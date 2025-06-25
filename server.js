// server.js

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS 설정을 위한 헤더
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["OPTIONS", "POST", "GET", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

// 본문 파싱 (text/plain 전용)
app.use(express.text());

let data = { message: "여러분 화이팅!" };

// 라우터 구성
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: data.message || "" });
});

// POST
router.post("/", (req, res) => {
  const newMessage = req.body;
  data.message = newMessage;
  res.status(201).send(`받은 POST 데이터: ${newMessage}`);
});

// PUT
router.put("/", (req, res) => {
  const updatedMessage = req.body;
  data.message = updatedMessage;
  res.send(`업데이트된 데이터: ${updatedMessage}`);
});

// DELETE
router.delete("/", (req, res) => {
  data = { message: "" };
  res.status(200).send("데이터가 삭제되었습니다.");
});

// 라우터 등록
app.use("/", router);

// const server = http.createServer((req, res) => {
//   if (req.method === "OPTIONS") {
//     res.writeHead(204, headers);
//     res.end();
//     return;
//   }

//   if (req.method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json", ...headers });
//     res.end(JSON.stringify(data));
//   }

//   if (req.method === "POST") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`받은 POST 데이터: ${body}`);
//     });
//   }

//   if (req.method === "PUT") {
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });

//     req.on("end", () => {
//       data.message = body;
//       res.writeHead(200, headers);
//       res.end(`업데이트된 데이터: ${body}`);
//     });
//   }

//   if (req.method === "DELETE") {
//     data = {};
//     res.writeHead(200, headers);
//     res.end("데이터가 삭제되었습니다.");
//   }
// });

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}/ 에서 실행 중입니다.`);
});

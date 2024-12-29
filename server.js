import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import noticeRoutes from "./routes/noticeRoutes";
import pressRelease from "./routes/pressRelease";
import announceRoutes from "./routes/announceRoutes";
import { isTokenValid } from "./middleware/authMiddleware";

import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",   // 로컬 개발 서버
  "https://dnn-corp.pages.dev", // 실제 배포 URL
  "*"
];

// CORS 설정 - 반드시 서버 초기 설정에 포함
app.use(cors({
  origin: allowedOrigins, // 모든 출처 허용 - Postman 테스트용으로 모든 origin 허용
  credentials: true,
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
}));

app.use(express.json());
dotenv.config();
connectDB();


app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  
  const token = req.headers.authorization?.split(" ")[1]; // Bearer 토큰 파싱
  if (!token || !isTokenValid(token)) { // 유효성 검사
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

app.use("/api/notices", noticeRoutes);
app.use("/api/prs", pressRelease);
app.use("/api/ans", announceRoutes); // 문의 라우트 추가


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
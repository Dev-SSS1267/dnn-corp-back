import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import noticeRoutes from "./routes/noticeRoutes";
import pressreleaseRoutes from "./routes/pressreleaseRoutes";
import announceRoutes from "./routes/announceRoutes";

import cors from "cors";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",   // 로컬 개발 서버
  "https://khbs.kyunggi.club", // 실제 배포 URL
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
app.use("/api/notices", noticeRoutes);
app.use("/api/prs", pressreleaseRoutes);
app.use("/api/ans", announceRoutes); // 문의 라우트 추가

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
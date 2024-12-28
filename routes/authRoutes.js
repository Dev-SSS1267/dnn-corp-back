const express = require("express");
const router = express.Router();
const { register, login, getUserInfo, getUserById } = require("../controllers/authController");
const { authenticate, isAdmin } = require("../middleware/authMiddleware");

// 회원가입
router.post("/register", register);

// 로그인
router.post("/login", login);

// 본인 정보 조회 (로그인된 사용자)
router.get("/me", authenticate, getUserInfo);

// 특정 유저 정보 조회 (관리자 전용)
router.get("/:id", authenticate, isAdmin, getUserById);

module.exports = router;
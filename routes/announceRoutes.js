const express = require("express");
const router = express.Router();
const { getAnnounces, addAnnounce, getAnnounce, updateAnnounce, deleteAnnounce } = require("../controllers/announceController");

// 공지 가져오기
router.get("/", getAnnounces);

// 공지 추가 (관리자만)
router.post("/", addAnnounce);

// 공지 수정 (관리자만)
router.put("/:id", updateAnnounce);

// 특정 공지사항 조회
 router.get("/:id", getAnnounce);

// 공지 삭제 (관리자만)
router.delete("/:id", deleteAnnounce);

module.exports = router;
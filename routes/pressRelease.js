const express = require("express");
const router = express.Router();
const { getPressRelease, addPressRelease, getPressRelease, updatePressRelease, deletePressRelease } = require("/controllers/pressReleaseController");

// 공지 가져오기
router.get("/", getPressRelease);

// 공지 추가 (관리자만)
router.post("/", addPressRelease);

// 공지 수정 (관리자만)
router.put("/:id", updatePressRelease);

// 특정 공지사항 조회
 router.get("/:id", getPressRelease);

// 공지 삭제 (관리자만)
router.delete("/:id", deletePressRelease);

module.exports = router;
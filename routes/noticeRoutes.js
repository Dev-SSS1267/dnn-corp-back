const express = require("express");
const router = express.Router();
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const {
  getNotices,
  addNotice,
  getNotice,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

// R2 Client 설정
const R2_CLIENT = new S3Client({
  region: "auto",
  endpoint: "https://32fcf5289c98c594ffd073827afaf16a.r2.cloudflarestorage.com",
  credentials: {
    accessKeyId: "3766bb2666a54631fd1f1b47dc84e64f",
    secretAccessKey: "f162480ad1be534a58f9df4e181c03d44077db38f832927ac1852d2914ed021a",
  },
});

// multer 설정
const upload = multer({ storage: multer.memoryStorage() });

// 파일 업로드 라우트
router.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("파일을 업로드하세요.");
  }

  try {
    const bucketName = "board-attachments";
    const filePath = `dnn/notice/${file.originalname}`;

    // R2에 파일 업로드
    await R2_CLIENT.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: filePath,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const fileUrl = `https://${R2_CLIENT.config.endpoint}/${bucketName}/${filePath}`;
    res.json({ message: "업로드 성공", fileUrl });
  } catch (error) {
    console.error("R2 업로드 오류:", error);
    res.status(500).send("파일 업로드 실패");
  }
});

// 공지 관련 라우트
router.get("/", getNotices);
router.post("/", addNotice);
router.get("/:id", getNotice);
router.put("/:id", updateNotice);
router.delete("/:id", deleteNotice);

module.exports = router;

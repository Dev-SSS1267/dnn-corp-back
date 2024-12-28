const Notice = require("../models/Notice");

// 모든 공지사항 조회
exports.getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createDate: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 등록
exports.addNotice = async (req, res) => {
  const { author, title, content, img } = req.body;
  try {
    const newNotice = new Notice({ author, title, content, img });
    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 공지사항 조회
exports.getNotice = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 수정
exports.updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, content, img } = req.body;

  try {
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    if (title) notice.title = title;
    if (content) notice.content = content;
    if (img) notice.img = img;
    notice.createDate = Date.now();

    await notice.save();
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//공지사항 삭제
exports.deleteNotice = async (req, res) => {
  try {
    const noticeId = req.params.id;

    // 공지사항 삭제
    const deletedNotice = await Notice.findByIdAndDelete(noticeId);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.status(200).json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error); // 오류 로그 출력
    res.status(500).json({ message: "Internal Server Error" });
  }
};
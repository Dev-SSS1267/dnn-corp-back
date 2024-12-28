const Announce = require("../models/Announce");

// 모든 공지사항 조회
exports.getAnnounces = async (req, res) => {
  try {
    const notices = await Announce.find().sort({ createDate: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 등록
exports.addAnnounce = async (req, res) => {
  const { author, title, content, img } = req.body;
  try {
    const newAnnounce = new Announce({ author, title, content, img });
    await newAnnounce.save();
    res.status(201).json(newAnnounce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 공지사항 조회
exports.getAnnounce = async (req, res) => {
  const { id } = req.params;
  try {
    const notice = await Announce.findById(id);
    if (!notice) return res.status(404).json({ message: "Announce not found" });
    res.json(notice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 수정
exports.updateAnnounce = async (req, res) => {
  const { id } = req.params;
  const { title, content, img } = req.body;

  try {
    const notice = await Announce.findById(id);
    if (!notice) return res.status(404).json({ message: "Announce not found" });

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
exports.deleteAnnounce = async (req, res) => {
  try {
    const noticeId = req.params.id;

    // 공지사항 삭제
    const deletedAnnounce = await Announce.findByIdAndDelete(noticeId);

    if (!deletedAnnounce) {
      return res.status(404).json({ message: "Announce not found" });
    }

    res.status(200).json({ message: "Announce deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error); // 오류 로그 출력
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const Announce = require("../models/Announce");

// 모든 공지사항 조회
exports.getAnnounces = async (req, res) => {
  try {
    const announces = await Announce.find().sort({ createDate: -1 });
    res.json(announces);
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
    const announce = await Announce.findById(id);
    if (!announce) return res.status(404).json({ message: "Announce not found" });
    res.json(announce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 수정
exports.updateAnnounce = async (req, res) => {
  const { id } = req.params;
  const { title, content, img } = req.body;

  try {
    const announce = await Announce.findById(id);
    if (!announce) return res.status(404).json({ message: "Announce not found" });

    if (title) announce.title = title;
    if (content) announce.content = content;
    if (img) announce.img = img;
    announce.createDate = Date.now();

    await announce.save();
    res.json(announce);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//공지사항 삭제
exports.deleteAnnounce = async (req, res) => {
  try {
    const announceId = req.params.id;

    // 공지사항 삭제
    const deletedAnnounce = await Announce.findByIdAndDelete(announceId);

    if (!deletedAnnounce) {
      return res.status(404).json({ message: "Announce not found" });
    }

    res.status(200).json({ message: "Announce deleted successfully" });
  } catch (error) {
    console.error("Error deleting announce:", error); // 오류 로그 출력
    res.status(500).json({ message: "Internal Server Error" });
  }
};
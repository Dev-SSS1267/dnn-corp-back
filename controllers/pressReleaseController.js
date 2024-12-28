const PressRelease = require("../models/PressRelease");

// 모든 공지사항 조회
exports.getPressReleases = async (req, res) => {
  try {
    const pressreleases = await PressRelease.find().sort({ createDate: -1 });
    res.json(pressreleases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 등록
exports.addPressRelease = async (req, res) => {
  const { author, title, content, img } = req.body;
  try {
    const newPressRelease = new PressRelease({ author, title, content, img });
    await newPressRelease.save();
    res.status(201).json(newPressRelease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 공지사항 조회
exports.getPressRelease = async (req, res) => {
  const { id } = req.params;
  try {
    const pressrelease = await PressRelease.findById(id);
    if (!pressrelease) return res.status(404).json({ message: "PressRelease not found" });
    res.json(pressrelease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 공지사항 수정
exports.updatePressRelease = async (req, res) => {
  const { id } = req.params;
  const { title, content, img } = req.body;

  try {
    const pressrelease = await PressRelease.findById(id);
    if (!pressrelease) return res.status(404).json({ message: "PressRelease not found" });

    if (title) pressrelease.title = title;
    if (content) pressrelease.content = content;
    if (img) pressrelease.img = img;
    pressrelease.createDate = Date.now();

    await pressrelease.save();
    res.json(pressrelease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//공지사항 삭제
exports.deletePressRelease = async (req, res) => {
  try {
    const pressreleaseId = req.params.id;

    // 공지사항 삭제
    const deletedPressRelease = await PressRelease.findByIdAndDelete(pressreleaseId);

    if (!deletedPressRelease) {
      return res.status(404).json({ message: "PressRelease not found" });
    }

    res.status(200).json({ message: "PressRelease deleted successfully" });
  } catch (error) {
    console.error("Error deleting pressrelease:", error); // 오류 로그 출력
    res.status(500).json({ message: "Internal Server Error" });
  }
};
const Issue = require("../models/Issue");

// 모든 문의 조회
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 새로운 문의 등록
exports.addIssue = async (req, res) => {
  const { title, description, location } = req.body;
  try {
    const newIssue = new Issue({ title, description, location });
    await newIssue.save();
    res.status(201).json(newIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 문의 조회
exports.getIssue = async (req, res) => {
  const { id } = req.params;
  try {
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 답변 등록
exports.addResponse = async (req, res) => {
  const { id } = req.params;
  const { response } = req.body;
  try {
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.response = response;
    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 문의 수정
exports.updateIssue = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (title) issue.title = title;
    if (description) issue.description = description;

    await issue.save();
    res.json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 문의 삭제
exports.deleteIssue = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteIssues = await Issue.findByIdAndDelete(id);

    if (!deleteIssues) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.status(200).json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Error deleting issue:", error); // 오류 로그 출력
    res.status(500).json({ message: "Internal Server Error" });
  }
};
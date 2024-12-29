const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 회원가입
exports.register = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists", success: false });

    const user = new User({ username, password, isAdmin });
    await user.save();

    res.status(201).json({ message: "User registered successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found", success: false });

    // 비번 비교
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials", success: false });
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ 
      token,
      message: "User logged in successfully",
      success: true,
     });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

// 유저 정보 조회
exports.getUserInfo = async (req, res) => {
  try {
    // 인증된 사용자의 ID로 유저 정보 조회
    const user = await User.findById(req.user.userId).select("-password"); // 비밀번호는 제외하고 전송
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 특정 유저 정보 조회 (관리자용)
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
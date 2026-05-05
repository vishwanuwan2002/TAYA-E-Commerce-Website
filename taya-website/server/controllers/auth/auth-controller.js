const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../../helpers/prisma-client");

const JWT_SECRET = process.env.JWT_SECRET || "CLIENT_SECRET_KEY";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

const createAuthPayload = (user) => ({
  id: user.id,
  role: user.role,
  email: user.email,
  userName: user.userName || "",
});

const tokenOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 60 * 60 * 1000,
};

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const existingUsersWithEmail = await prisma.user.findMany({
      where: { email: normalizedEmail },
      select: { password: true },
    });

    // Business rule requested by user:
    // same email + same password cannot be registered twice,
    // but same email with a different password is allowed.
    for (const existingUser of existingUsersWithEmail) {
      const samePassword = await bcrypt.compare(password, existingUser.password);
      if (samePassword) {
        return res.status(400).json({
          success: false,
          message: "These credentials are already registered, please login",
        });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await prisma.user.create({
      data: {
        userName: userName || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        password: hashedPassword,
        role: "customer",
      },
    });

    const payload = createAuthPayload(createdUser);
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token, {
      ...tokenOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      user: payload,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = normalizeEmail(email);
    const users = await prisma.user.findMany({
      where: { email: normalizedEmail },
    });

    if (!users.length) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    let matchedUser = null;
    for (const user of users) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        matchedUser = user;
        break;
      }
    }

    if (!matchedUser) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials. Please try again.",
      });
    }

    const payload = createAuthPayload(matchedUser);

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });

    res.cookie("token", token, {
      ...tokenOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: payload,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token", { httpOnly: true, sameSite: "lax" }).json({
    success: true,
    message: "Logged out successfully.",
  });
};

const checkAuthStatus = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(200).json({ success: false, message: "No token found." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
      return res.status(401).json({ success: false, message: "Invalid session." });
    }

    return res.status(200).json({
      success: true,
      message: "User is authenticated.",
      user: createAuthPayload(user),
    });
  } catch (error) {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    return res.status(401).json({ success: false, message: "Invalid token." });
  }
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  checkAuthStatus,
};

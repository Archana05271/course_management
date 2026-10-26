import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";

export async function register(req, res, next) {
  try {
    const student = await authService.registerStudent(req.body);
    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const student = await authService.loginStudent(req.body);
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }
    const expiresIn = process.env.JWT_EXPIRES_IN || "1h";
    const token = jwt.sign(
      { email: student.email },
      process.env.JWT_SECRET,
      {
        subject: String(student.id),
        expiresIn: expiresIn,
      }
    );
    return res.status(200).json({
    success: true,
    message: "Login successful",
    token: token, // <-- Change 'Token' to lowercase 'token'
    tokenType: "Bearer",
    expiresin: expiresIn,
    student: student,
  });
  } catch (error) {
    next(error);
  }
}
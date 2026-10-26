import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/students.json');

// Helper to read students safely from the JSON file
function readStudents() {
  try {
    if (!fs.existsSync(filePath)) {
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(filePath, JSON.stringify([], null, 2));
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error("Error reading students file:", err);
    return [];
  }
}

// Helper to write students to the JSON file
function writeStudents(students) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(students, null, 2));
  } catch (err) {
    console.error("Error writing students file:", err);
  }
}

export async function registerStudent(userData) {
  const { name, email, password, department } = userData;
  const students = readStudents();

  const normalizedEmail = email.toLowerCase().trim();
  if (students.some(s => s.email === normalizedEmail)) {
    throw new Error("Email is already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newStudent = {
    id: Date.now().toString(),
    name,
    email: normalizedEmail,
    password: hashedPassword,
    department: department || "General",
  };

  students.push(newStudent);
  writeStudents(students);

  console.log("✅ Successfully registered student:", normalizedEmail);

  const { password: _, ...studentWithoutPassword } = newStudent;
  return studentWithoutPassword;
}

export async function loginStudent(credentials) {
  const { email, password } = credentials;
  const students = readStudents();
  const normalizedEmail = email.toLowerCase().trim();

  console.log("🔍 Attempting login for:", normalizedEmail);
  console.log("📂 Current stored users:", students.map(s => s.email));

  const student = students.find(s => s.email === normalizedEmail);
  if (!student) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  console.log("✅ Password match successful for:", normalizedEmail);

  const { password: _, ...studentWithoutPassword } = student;
  return studentWithoutPassword;
}
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default function verifyToken(token) {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment.");
  }

  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

import express from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "../db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "capstone_secret_key";

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");

    const { firstName, lastName, email, password } = req.body;

    const existingEmail = await collection.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email id already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    const newUser = {
      email,
      firstName,
      lastName,
      password: hash,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newUser);

    const payload = { user: { id: result.insertedId } };
    const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ authtoken, email });
  } catch (e) {
    next(e);
  }
});

// Login an existing user
router.post("/login", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("users");

    const { email, password } = req.body;

    // Locate the current user in the database
    const theUser = await collection.findOne({ email: email });

    if (theUser) {
      const result = await bcryptjs.compare(password, theUser.password);
      if (!result) {
        return res.status(404).json({ error: "Wrong password" });
      }

      const payload = { user: { id: theUser._id.toString() } };
      const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

      return res.json({
        authtoken,
        userName: theUser.firstName,
        userEmail: theUser.email,
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    next(e);
  }
});

export default router;

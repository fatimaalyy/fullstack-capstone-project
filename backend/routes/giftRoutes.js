import express from "express";
import connectToDatabase from "../db.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get all gifts
router.get("/gifts", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const gifts = await collection.find({}).toArray();
    res.json(gifts);
  } catch (e) {
    next(e);
  }
});

// Get a single gift by id
router.get("/gifts/:id", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");
    const id = req.params.id;

    const gift = await collection.findOne({ id: id });

    if (!gift) {
      return res.status(404).send("Gift not found");
    }

    res.json(gift);
  } catch (e) {
    next(e);
  }
});

export default router;

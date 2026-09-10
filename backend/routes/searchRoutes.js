import express from "express";
import connectToDatabase from "../db.js";

const router = express.Router();

// Search gifts by name/description, optionally filtered by category
router.get("/search", async (req, res, next) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("gifts");

    const { name, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    // Filter results based on category
    if (category && category.toLowerCase() !== "all") {
      query.category = { $regex: `^${category}$`, $options: "i" };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const results = await collection.find(query).toArray();
    res.json(results);
  } catch (e) {
    next(e);
  }
});

export default router;

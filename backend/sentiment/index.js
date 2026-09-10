import express from "express";
import natural from "natural";

const router = express.Router();

const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");

// Analyze the sentiment of submitted review text
router.post("/analyze", (req, res) => {
  const { review } = req.body;

  if (!review) {
    return res.status(400).json({ error: "Review text is required" });
  }

  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(review);

  const score = analyzer.getSentiment(tokens);

  let sentiment = "neutral";
  if (score > 0.33) sentiment = "positive";
  else if (score < -0.33) sentiment = "negative";

  res.json({ review, score, sentiment });
});

export default router;

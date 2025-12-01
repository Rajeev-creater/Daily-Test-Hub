const express = require("express");
const cors = require("cors");
const path = require("path");
const { getDailyQuestions, chapterQuestions } = require("./questions");
const { getShortNotes } = require("./shortNotes");
const { askAI } = require("./chatbot");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/health", (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

// Get all subjects and chapters for a class
app.get("/subjects-chapters/:classNum", (req, res) => {
  const { classNum } = req.params;
  const classKey = parseInt(classNum);
  
  if (!chapterQuestions[classKey]) {
    return res.status(400).json({ error: "Invalid class" });
  }
  
  const subjectsWithChapters = {};
  Object.keys(chapterQuestions[classKey]).forEach(subject => {
    subjectsWithChapters[subject] = Object.keys(chapterQuestions[classKey][subject]);
  });
  
  res.json(subjectsWithChapters);
});

// Get questions for a specific chapter
app.get("/daily-test/:classNum/:subject/:chapter", (req, res) => {
  const { classNum, subject, chapter } = req.params;
  const language = req.query.lang || "English";
  const qs = getDailyQuestions(parseInt(classNum), subject, chapter, language);
  
  if (!qs) {
    return res.status(400).json({ error: "Invalid class, subject, or chapter" });
  }
  
  res.json({ questions: qs, totalQuestions: 10, timeLimit: 600 }); // 10 minutes = 600 seconds
});

// Submit chapter test
app.post("/submit-test", (req, res) => {
  const { classNum, subject, chapter, answers, language } = req.body;
  
  if (!classNum || !subject || !chapter || !answers) {
    return res.status(400).json({ error: "Bad request" });
  }
  
  const qs = getDailyQuestions(parseInt(classNum), subject, chapter, language || "English");
  
  if (!qs) {
    return res.status(400).json({ error: "Invalid class, subject, or chapter" });
  }
  
  let score = 0;
  answers.forEach(a => {
    const q = qs.find(x => x.id === a.id);
    if (q && q.correct === a.ans) score++;
  });
  
  res.json({ score, total: qs.length });
});

// AI chat endpoint
// Get short notes for a chapter
app.get("/short-notes/:classNum/:subject/:chapter", (req, res) => {
  const { classNum, subject, chapter } = req.params;
  const notes = getShortNotes(parseInt(classNum), subject, decodeURIComponent(chapter));
  
  if (!notes) {
    return res.status(400).json({ error: "Short notes not found" });
  }
  
  res.json(notes);
});

app.post("/ask-ai", async (req, res) => {
  const text = (req.body.text || "").toString();
  if (!text) return res.status(400).json({ error: "empty text" });
  
  try {
    const reply = await askAI(text);
    res.json({ reply });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "AI error", detail: String(e) });
  }
});

// Fallback to index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log("Server running on port", PORT));

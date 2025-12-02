const Groq = require("groq-sdk");

const badWords = [
  "fuck",
  "bhosd",
  "madarchod",
  "rape",
  "sex",
  "lund",
  "chut",
  "mc",
  "bc",
  "bchd",
];

let client = null;

function getClient() {
  if (!client) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error("No GROQ_API_KEY configured.");
    }
    client = new Groq({ apiKey });
  }
  return client;
}

function containsBad(msg) {
  if (!msg) return false;
  const t = msg.toLowerCase();
  return badWords.some((w) => t.includes(w));
}

async function askAI(text) {
  if (containsBad(text))
    return "Please ask politely without offensive language.";

  const lowerText = text.toLowerCase().trim();
  if (
    lowerText.includes("what is your name") ||
    lowerText.includes("your name") ||
    lowerText.includes("who are you")
  ) {
    return "🚩 I am Mahadev, your AI study assistant! I'm here to help you with your studies and answer your doubts. 🚩 Har Har Mahadev!";
  }

  try {
    const c = getClient();
    const resp = await c.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a polite Class 10 tutor. Keep answers concise and educational. Give steps for problem solving and short explanation.",
        },
        { role: "user", content: text },
      ],
      max_tokens: 500,
    });
    return resp.choices?.[0]?.message?.content || "No reply";
  } catch (error) {
    console.error("AI Error:", error.message);
    return "Sorry, AI is not available right now. Please try again later.";
  }
}

module.exports = { askAI, containsBad };

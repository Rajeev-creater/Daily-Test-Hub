const BACKEND = "";
const base = () => BACKEND || window.location.origin;

let allQuestions = [];
let currentQuestionIdx = 0;
let answered = {};
let timerInterval = null;
let timeLeft = 600; // 10 minutes
const TOTAL_TIME = 600;
let currentSubject = "";
let currentChapter = "";
let selectedClass = null;
let selectedLanguage = "English";
let studyStartTime = null;
let totalStudyTime = 0;
let studyTimeInterval = null;
let aiHistory = [];

const TRANSLATIONS = {
  English: {
    selectClass: "📚 Select Your Class",
    classIX: "Class IX", classX: "Class X", classXI: "Class XI", classXII: "Class XII",
    selectSubject: "Select a Subject",
    selectChapter: "Select a Chapter",
    questions10: "10 Questions | 10 Min",
    back: "← Back", clear: "Clear", submit: "Submit",
    previous: "< Previous", next: "Next >",
    solution: "Solution", testCompleted: "Test Completed!",
    correct: "Correct", incorrect: "Incorrect", unanswered: "Unanswered",
    bestOfLuck: "✨ Best of Luck for Your Future Tests! ✨",
    retakeTest: "Retake Test", loadingQuestions: "Loading questions...",
    askDoubt: "Ask Doubt (AI)", typeDoubt: "Type your doubt...", ask: "Ask",
    dailyMotivation: "💪 Daily Motivation", yourThoughts: "Your Thoughts",
    addYourThought: "Add your daily motivation thought...", addThought: "Add Thought",
    createdBy: "Created by Rajeev Kumar from 🔥Bihar🔥", harharMahadev: "🚩 Har Har Mahadev 🚩",
    addHours: "+ Add Hours", changeClass: "Change Class",
    addStudyTime: "Add Study Time", hours: "Hours", minutes: "Minutes",
    addTime: "Add Time", cancel: "Cancel", error: "Error loading questions",
    todayStudyTime: "Today's Study Time", chatHistory: "Chat History", delete: "Delete"
  },
  हिंदी: {
    selectClass: "📚 अपनी कक्षा चुनें",
    classIX: "कक्षा IX", classX: "कक्षा X", classXI: "कक्षा XI", classXII: "कक्षा XII",
    selectSubject: "विषय चुनें", selectChapter: "अध्याय चुनें",
    questions10: "10 प्रश्न | 10 मिनट",
    back: "← वापस", clear: "साफ़ करें", submit: "जमा करें",
    previous: "< पिछला", next: "अगला >",
    solution: "समाधान", testCompleted: "परीक्षा पूरी हुई!",
    correct: "सही", incorrect: "गलत", unanswered: "अनुत्तरित",
    bestOfLuck: "✨ अपनी भविष्य की परीक्षाओं के लिए शुभकामनाएं! ✨",
    retakeTest: "परीक्षा दोबारा लें", loadingQuestions: "प्रश्न लोड हो रहे हैं...",
    askDoubt: "संदेह पूछें (AI)", typeDoubt: "अपना प्रश्न टाइप करें...", ask: "पूछें",
    dailyMotivation: "💪 दैनिक प्रेरणा", yourThoughts: "आपके विचार",
    addYourThought: "अपना दैनिक प्रेरणा विचार जोड़ें...", addThought: "विचार जोड़ें",
    createdBy: "राजीव कुमार 🔥बिहार🔥 से बनाया गया", harharMahadev: "🚩 हर हर महादेव 🚩",
    addHours: "+ घंटे जोड़ें", changeClass: "कक्षा बदलें",
    addStudyTime: "अध्ययन समय जोड़ें", hours: "घंटे", minutes: "मिनट",
    addTime: "समय जोड़ें", cancel: "रद्द करें", error: "प्रश्न लोड करने में त्रुटि",
    todayStudyTime: "आज का अध्ययन समय", chatHistory: "चैट इतिहास", delete: "हटाएँ"
  }
};

function t(key) {
  return TRANSLATIONS[selectedLanguage][key] || TRANSLATIONS.English[key] || key;
}

function applyTranslations() {
  document.querySelectorAll("[data-text]").forEach(el => {
    const key = el.getAttribute("data-text");
    el.innerText = t(key);
  });
}

const MOTIVATION_QUOTES = [
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "The only way to do great work is to love what you do. - Steve Jobs",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Excellence is not a destination; it is a continuous journey that never ends. - Brian Tracy",
  "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
  "The future depends on what you do today. - Mahatma Gandhi",
  "Great things never come from comfort zones.",
  "Your limitation—it's only your imagination.",
  "Push yourself, because no one else is going to do it for you.",
  "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
  "Don't watch the clock; do what it does. Keep going.",
  "Comparison is the thief of joy. Focus on your own progress."
];

const SUBJECTS_BY_CLASS = {
  9: ["Maths", "Science", "SST", "Hindi", "English"],
  10: ["Maths", "Science", "SST", "Hindi", "English"],
  11: ["Maths", "Science", "SST", "Hindi", "English", "Economics"],
  12: ["Maths", "Science", "SST", "Hindi", "English", "Accountancy"]
};

const SUBJECT_ICONS = {
  "Maths": "📐", "Science": "🔬", "SST": "🌍", "Hindi": "📖", "English": "✏️", "Economics": "💹", "Accountancy": "📊"
};

function trackEvent(eventName, eventData = {}) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
}

function hideAds() {
  const topAd = document.getElementById('topAdBanner');
  const bottomAd = document.getElementById('bottomAdBanner');
  if (topAd) topAd.classList.add('hide');
  if (bottomAd) bottomAd.classList.add('hide');
}

function showAds() {
  const topAd = document.getElementById('topAdBanner');
  const bottomAd = document.getElementById('bottomAdBanner');
  if (topAd) topAd.classList.remove('hide');
  if (bottomAd) bottomAd.classList.remove('hide');
}

// Setup class selection
function setupClassSelection() {
  document.querySelectorAll(".selection-card").forEach(card => {
    card.onclick = () => {
      selectedClass = parseInt(card.getAttribute("data-class"));
      trackEvent('class_selected', { class: selectedClass });
      loadSubjectSelection();
    };
  });
}

// Load subjects and show chapters
async function loadSubjectSelection() {
  document.getElementById("classSelection").style.display = "none";
  document.getElementById("homePage").style.display = "block";
  hideAds();
  
  try {
    const res = await fetch(`${base()}/subjects-chapters/${selectedClass}`);
    const data = await res.json();
    
    const grid = document.getElementById("subjectsGrid");
    grid.innerHTML = Object.keys(data).map(subject => 
      `<div class="subject-card" data-subject="${subject}">
        <div class="subject-icon">${SUBJECT_ICONS[subject] || "📚"}</div>
        <div class="subject-name">${subject}</div>
      </div>`
    ).join("");
    
    document.querySelectorAll(".subject-card").forEach(card => {
      card.onclick = () => {
        const subject = card.getAttribute("data-subject");
        loadChapterSelection(subject, data[subject]);
      };
    });
    
    applyTranslations();
    loadMotivationQuotes();
  } catch (e) {
    alert(t("error"));
    console.error(e);
  }
}

// Load chapters for selected subject
function loadChapterSelection(subject, chapters) {
  currentSubject = subject;
  document.getElementById("homeTitle").innerText = `${subject} - ${t("selectChapter")}`;
  const grid = document.getElementById("subjectsGrid");
  
  // Simply render chapters (no button in grid)
  grid.innerHTML = chapters.map(chapter =>
    `<div class="chapter-card" data-chapter="${chapter}">
      <div class="chapter-icon">📖</div>
      <div class="chapter-name">${chapter}</div>
      <div class="chapter-questions">10 ${t("questions10")}</div>
      <div class="chapter-actions" style="display: flex; gap: 10px; margin-top: 10px;">
        <button class="btn-test" data-chapter="${chapter}" style="flex: 1; padding: 8px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">📝 Start Test</button>
        <button class="btn-notes" data-chapter="${chapter}" style="flex: 1; padding: 8px; background: #2196F3; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">📖 View Notes</button>
      </div>
    </div>`
  ).join("");
  
  document.querySelectorAll(".btn-test").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const chapter = btn.getAttribute("data-chapter");
      currentChapter = chapter;
      loadTest(parseInt(selectedClass), subject, chapter);
    };
  });
  
  document.querySelectorAll(".btn-notes").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const chapter = btn.getAttribute("data-chapter");
      currentChapter = chapter;
      viewShortNotes(parseInt(selectedClass), subject, chapter);
    };
  });
}

// View short notes for a chapter
async function viewShortNotes(classNum, subject, chapter) {
  try {
    const res = await fetch(`${base()}/short-notes/${classNum}/${subject}/${encodeURIComponent(chapter)}`);
    const notes = await res.json();
    
    if (!notes) {
      alert("Short notes not available");
      return;
    }
    
    document.getElementById("notesTitle").innerText = `${subject} - ${chapter}`;
    document.getElementById("notesSummary").innerHTML = `<strong>Summary:</strong> ${notes.summary || ""}`;
    
    const pointsList = document.getElementById("notesPoints");
    pointsList.innerHTML = notes.importantPoints.map(point => `<li style="margin-bottom: 8px;">${point}</li>`).join("");
    
    const formulasDiv = document.getElementById("notesFormulas");
    formulasDiv.innerHTML = notes.formulas.length > 0 
      ? notes.formulas.map(f => `<div style="margin-bottom: 12px;"><code style="background: white; padding: 8px; border-radius: 4px; display: block;">${f}</code></div>`).join("")
      : "<p style='color: #666;'>No formulas for this chapter.</p>";
    
    document.getElementById("notesModal").style.display = "flex";
    
    // Refresh ads in modal
    if (window.adsbygoogle) {
      try {
        (adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {}
    }
  } catch (e) {
    console.error(e);
    alert("Error loading short notes");
  }
}

document.getElementById("closeNotesBtn")?.addEventListener("click", () => {
  document.getElementById("notesModal").style.display = "none";
});

// Load test for chapter
async function loadTest(classNum, subject, chapter) {
  document.getElementById("notesModal").style.display = "none";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("motivationSection").style.display = "none";
  document.getElementById("examArea").style.display = "block";
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("currentSubject").innerText = `${subject} - ${chapter}`;
  
  hideAds();
  showAds(); // Hidden during test
  hideAds();
  
  try {
    const res = await fetch(`${base()}/daily-test/${classNum}/${encodeURIComponent(subject)}/${encodeURIComponent(chapter)}`);
    const data = await res.json();
    
    if (!data || !data.questions) {
      alert("No questions loaded");
      return;
    }
    
    allQuestions = data.questions;
    currentQuestionIdx = 0;
    answered = {};
    timeLeft = TOTAL_TIME;
    
    trackEvent('test_started', { class: classNum, subject, chapter });
    
    // Ensure rendering happens after DOM is ready
    setTimeout(() => {
      renderQuestion();
      updateNavButtons();
    }, 50);
    
    startTimer();
    studyStartTime = Date.now();
  } catch (e) {
    alert("Error: Cannot load test");
  }
}

function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      autoSubmitTest();
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
}

function updateTimerDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  document.getElementById("timerText").innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  
  const percent = (timeLeft / TOTAL_TIME) * 100;
  const circle = document.getElementById("timerCircle");
  const circumference = 2 * Math.PI * 45;
  circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
  
  document.getElementById("qCounter").innerText = `Question ${currentQuestionIdx + 1} of ${allQuestions.length}`;
}

function renderQuestion() {
  if (!allQuestions || allQuestions.length === 0) return;
  
  const q = allQuestions[currentQuestionIdx];
  if (!q) return;
  
  // Update question
  const qContent = document.getElementById("questionContent");
  if (qContent) {
    qContent.innerHTML = `<div class="question-text">${q.q}</div>`;
    qContent.style.display = "block";
  }
  
  const optBox = document.getElementById("optionsBox");
  if (!optBox) return;
  
  optBox.innerHTML = "";
  optBox.style.display = "grid";
  optBox.style.visibility = "visible";
  
  const isAnswered = answered[currentQuestionIdx] !== undefined;
  const selectedAns = answered[currentQuestionIdx];
  const isCorrect = selectedAns === q.correct;
  
  Object.keys(q.options).forEach(key => {
    const btn = document.createElement("button");
    let className = "option-btn";
    
    if (answered[currentQuestionIdx] === key) {
      className += " selected";
      if (isCorrect) className += " correct";
      else className += " incorrect";
    } else if (isAnswered && key === q.correct) {
      className += " correct-answer";
    }
    
    btn.className = className;
    btn.innerText = `${key}: ${q.options[key]}`;
    btn.onclick = () => {
      if (!answered[currentQuestionIdx]) {
        answered[currentQuestionIdx] = key;
        renderQuestion();
        updateNavButtons();
      }
    };
    optBox.appendChild(btn);
  });
  
  // Show feedback after answer is selected
  if (isAnswered) {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.className = isCorrect ? "feedback-correct" : "feedback-incorrect";
    feedbackDiv.innerHTML = `<span>${isCorrect ? "✓ Correct!" : "✗ Incorrect!"}</span> <span class="feedback-correct-ans">Correct: ${q.correct}</span>`;
    optBox.appendChild(feedbackDiv);
    
    // Show solution
    const solBox = document.getElementById("solutionBox");
    solBox.style.display = "block";
    document.getElementById("solutionContent").innerHTML = q.solution || "No explanation available";
  } else {
    document.getElementById("solutionBox").style.display = "none";
  }
}

function updateQuestionNav() {
  const navDiv = document.getElementById("navButtons");
  navDiv.innerHTML = "";
  
  for (let i = 0; i < allQuestions.length; i++) {
    const btn = document.createElement("button");
    btn.innerText = i + 1;
    btn.className = i === currentQuestionIdx ? "active" : "";
    btn.onclick = () => {
      currentQuestionIdx = i;
      renderQuestion();
      updateQuestionNav();
    };
    navDiv.appendChild(btn);
  }
}

function updateNavButtons() {
  updateQuestionNav();
}

function autoSubmitTest() {
  stopTimer();
  submitTest();
}

function submitTest() {
  stopTimer();
  const total = allQuestions.length;
  const correct = Object.keys(answered).filter(idx => {
    return allQuestions[idx].correct === answered[idx];
  }).length;
  const unanswered = total - Object.keys(answered).length;
  const incorrect = total - correct - unanswered;
  
  showResultCard(correct, incorrect, unanswered, total);
}

function showResultCard(correct, incorrect, unanswered, total) {
  const percentage = Math.round((correct / total) * 100);
  trackEvent('test_completed', { class: selectedClass, subject: currentSubject, chapter: currentChapter, score: correct, total, percentage });
  
  document.getElementById("correctCount").innerText = correct;
  document.getElementById("incorrectCount").innerText = incorrect;
  document.getElementById("unansweredCount").innerText = unanswered;
  document.getElementById("scorePercentage").innerText = percentage + "%";
  document.getElementById("scoreFraction").innerText = correct + "/" + total;
  
  let performance = "", ratingClass = "", message = "";
  if (percentage >= 80) {
    performance = selectedLanguage === "हिंदी" ? "🌟 उत्कृष्ट" : "🌟 EXCELLENT";
    ratingClass = "rating-excellent";
    message = selectedLanguage === "हिंदी" ? "शानदार! आप शीर्ष प्रदर्शन कर रहे हैं!" : "Excellent! You're performing great!";
  } else if (percentage >= 60) {
    performance = selectedLanguage === "हिंदी" ? "👍 अच्छा" : "👍 GOOD";
    ratingClass = "rating-good";
    message = selectedLanguage === "हिंदी" ? "अच्छा काम! सुधार जारी रखें।" : "Good job! Keep improving.";
  } else if (percentage >= 40) {
    performance = selectedLanguage === "हिंदी" ? "📈 औसत" : "📈 AVERAGE";
    ratingClass = "rating-average";
    message = selectedLanguage === "हिंदी" ? "और अभ्यास करें और समीक्षा करें।" : "Review and practice more.";
  } else {
    performance = selectedLanguage === "हिंदी" ? "💪 कमजोर - आप कर सकते हैं!" : "💪 POOR - YOU CAN DO IT!";
    ratingClass = "rating-poor";
    message = selectedLanguage === "हिंदी" ? "हार न मानें! फिर से प्रयास करें।" : "Don't give up! Try again.";
  }
  
  document.getElementById("performanceRating").className = "performance-rating " + ratingClass;
  document.getElementById("performanceRating").innerText = performance;
  document.getElementById("resultMessage").innerText = message;
  
  const circle = document.getElementById("progressCircle");
  const circumference = 2 * Math.PI * 90;
  const offset = circumference - (percentage / 100) * circumference;
  circle.style.strokeDashoffset = offset;
  
  document.getElementById("examArea").style.display = "none";
  document.getElementById("resultModal").style.display = "flex";
}

// Event listeners
document.getElementById("backBtn").onclick = () => {
  stopTimer();
  showAds();
  document.getElementById("examArea").style.display = "none";
  document.getElementById("resultModal").style.display = "none";
  document.getElementById("homePage").style.display = "block";
  document.getElementById("motivationSection").style.display = "block";
  allQuestions = [];
  currentQuestionIdx = 0;
  answered = {};
  applyTranslations();
};

document.getElementById("backToClassBtn").onclick = () => {
  selectedClass = null;
  selectedLanguage = "English";
  document.getElementById("homePage").style.display = "none";
  document.getElementById("motivationSection").style.display = "none";
  document.getElementById("classSelection").style.display = "block";
  applyTranslations();
};

document.getElementById("prevBtn").onclick = () => {
  if (currentQuestionIdx > 0) {
    currentQuestionIdx--;
    renderQuestion();
    updateNavButtons();
  }
};

document.getElementById("nextBtn").onclick = () => {
  if (currentQuestionIdx < allQuestions.length - 1) {
    currentQuestionIdx++;
    renderQuestion();
    updateNavButtons();
  }
};

document.getElementById("clearBtn").onclick = () => {
  delete answered[currentQuestionIdx];
  renderQuestion();
};

document.getElementById("submitBtn").onclick = submitTest;

document.getElementById("retakeBtn").onclick = () => {
  document.getElementById("resultModal").style.display = "none";
  studyStartTime = Date.now();
  loadTest(selectedClass, currentSubject, currentChapter);
};

// AI Widget Setup
function setupAIWidget() {
  const widget = document.getElementById("aiWidget");
  const circle = document.getElementById("aiWidgetCircle");
  const panel = document.getElementById("aiPanel");
  let offsetX = 0, offsetY = 0, isDragging = false;
  
  circle.onclick = (e) => {
    e.stopPropagation();
    panel.style.display = panel.style.display === "none" ? "block" : "none";
  };
  
  document.getElementById("closeAiBtn").onclick = () => {
    panel.style.display = "none";
  };
  
  widget.ondragstart = (e) => {
    isDragging = true;
    offsetX = e.clientX - widget.offsetLeft;
    offsetY = e.clientY - widget.offsetTop;
  };
  
  document.ondragover = (e) => {
    e.preventDefault();
    if (isDragging) {
      widget.style.left = (e.clientX - offsetX) + "px";
      widget.style.top = (e.clientY - offsetY) + "px";
    }
  };
  
  document.ondragend = () => {
    isDragging = false;
  };
  
  document.getElementById("askBtn").onclick = async () => {
    const input = document.getElementById("userInput");
    const text = input.value.trim();
    if (!text) return;
    
    aiHistory.push({ role: "user", text });
    input.value = "";
    renderAIChat();
    
    try {
      const res = await fetch(`${base()}/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      aiHistory.push({ role: "assistant", text: data.reply });
      renderAIChat();
    } catch (e) {
      console.error(e);
    }
  };
  
  document.getElementById("userInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("askBtn").click();
    }
  });
}

function renderAIChat() {
  const replyDiv = document.getElementById("aiReply");
  replyDiv.innerHTML = `
    <div class="ai-history">
      ${aiHistory.slice().reverse().map((msg, idx) => `
        <div class="ai-message ${msg.role}">
          <div class="message-text">${msg.text}</div>
          ${msg.role === 'user' ? `<button onclick="deleteAIMessage(${aiHistory.length - 1 - idx})" class="delete-btn">×</button>` : ''}
        </div>
      `).join('')}
    </div>
  `;
  replyDiv.scrollTop = replyDiv.scrollHeight;
}

function deleteAIMessage(idx) {
  aiHistory.splice(idx, 1);
  renderAIChat();
}

function loadMotivationQuotes() {
  const container = document.getElementById("quotesContainer");
  const footerContainer = document.getElementById("dailyQuotesFooter");
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem(`motivation_${today}`);
  
  let quotesToShow = stored ? JSON.parse(stored) : MOTIVATION_QUOTES.slice(0, 2);
  if (!stored) localStorage.setItem(`motivation_${today}`, JSON.stringify(quotesToShow));
  
  container.innerHTML = quotesToShow.map(q => `<div class="quote-box">"${q}"</div>`).join("");
  footerContainer.innerHTML = quotesToShow.map(q => `<div class="footer-quote">"${q}"</div>`).join("");
  loadUserMotivations();
}

function loadUserMotivations() {
  const today = new Date().toISOString().slice(0, 10);
  const thoughts = JSON.parse(localStorage.getItem(`user_motivations_${today}`) || "[]");
  document.getElementById("userMotivations").innerHTML = thoughts.map(t => `<div class="user-motivation-item">💭 ${t}</div>`).join("");
}

document.getElementById("addMotivationBtn")?.addEventListener("click", () => {
  const text = document.getElementById("motivationInput").value.trim();
  if (!text) return alert(t("error"));
  
  const today = new Date().toISOString().slice(0, 10);
  const thoughts = JSON.parse(localStorage.getItem(`user_motivations_${today}`) || "[]");
  thoughts.push(text);
  localStorage.setItem(`user_motivations_${today}`, JSON.stringify(thoughts));
  document.getElementById("motivationInput").value = "";
  loadUserMotivations();
});

document.getElementById("addStudyTimeBtn").onclick = () => {
  document.getElementById("addTimeModal").style.display = "flex";
};

document.getElementById("addTimeSubmitBtn").onclick = () => {
  const hours = parseInt(document.getElementById("addHours").value) || 0;
  const minutes = parseInt(document.getElementById("addMinutes").value) || 0;
  totalStudyTime += (hours * 3600) + (minutes * 60);
  
  const today = new Date().toISOString().slice(0, 10);
  localStorage.setItem(`study_time_${today}`, totalStudyTime);
  updateStudyTimeDisplay();
  
  document.getElementById("addHours").value = "0";
  document.getElementById("addMinutes").value = "0";
  document.getElementById("addTimeModal").style.display = "none";
};

document.getElementById("cancelTimeBtn").onclick = () => {
  document.getElementById("addTimeModal").style.display = "none";
};

function updateStudyTimeDisplay() {
  const hours = Math.floor(totalStudyTime / 3600);
  const minutes = Math.floor((totalStudyTime % 3600) / 60);
  const el = document.getElementById("studyTime");
  if (el) el.innerText = `${hours}h ${minutes}m`;
}

function loadStudyTime() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem(`study_time_${today}`);
  totalStudyTime = stored ? parseInt(stored) : 0;
  updateStudyTimeDisplay();
}

function startDailyStudyTimer() {
  if (studyTimeInterval) clearInterval(studyTimeInterval);
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem(`study_time_${today}`);
  totalStudyTime = stored ? parseInt(stored) : 0;
  
  studyTimeInterval = setInterval(() => {
    if (studyStartTime) {
      totalStudyTime += 1;
      localStorage.setItem(`study_time_${today}`, totalStudyTime);
      updateStudyTimeDisplay();
    }
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  trackEvent('page_view', { page_title: 'Class Selection' });
  applyTranslations();
  setupClassSelection();
  setupAIWidget();
  loadMotivationQuotes();
  loadStudyTime();
  startDailyStudyTimer();
});

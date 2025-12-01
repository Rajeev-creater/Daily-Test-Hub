const crypto = require("crypto");

function getTodaySeed() {
  const today = new Date();
  return today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
}

// Generate 10 stub questions for any chapter
function generateStubQuestions(subject, chapter) {
  const questions = [];
  for (let i = 1; i <= 10; i++) {
    questions.push({
      q: `${subject} - ${chapter} Question ${i}`,
      options: {
        A: `Option A-${i}`,
        B: `Option B-${i}`,
        C: `Option C-${i}`,
        D: `Option D-${i}`
      },
      correct: ["A", "B", "C", "D"][i % 4],
      solution: `This is the solution for ${subject} ${chapter} Q${i}`
    });
  }
  return questions;
}

// Create chapter structure with stub questions
function createChapterStructure(chapters) {
  const structure = {};
  chapters.forEach(ch => {
    structure[ch] = generateStubQuestions(ch, ch);
  });
  return structure;
}

const chapterQuestions = {
  9: {
    Mathematics: createChapterStructure([
      "Numbers", "Polynomials", "Coordinate Geometry", "Equations", "Euclid's",
      "Lines", "Triangles", "Quadrilaterals", "Areas", "Circles",
      "Constructions", "Heron's Formula", "Volume", "Statistics", "Probability"
    ]),
    Science: createChapterStructure([
      "Why Ill", "Natural Resources", "Food Improvement", "Physics Basics",
      "Chemistry Basics", "Biology Basics", "Atoms", "Molecules", "Energy",
      "Forces", "Motion", "Light", "Sound", "Electricity", "Magnetism"
    ]),
    SST: createChapterStructure([
      "French Revolution", "Socialism", "Nazism", "Forest Society", "Pastoralists",
      "Size & Position", "Physical Features", "Drainage", "Climate", "Vegetation",
      "Population", "Political Science", "Democracy", "Constitution", "Elections",
      "Institutions", "Rights", "Village Economy", "Resources", "Poverty", "Food"
    ]),
    Hindi: createChapterStructure([
      "Vyakaran", "Sahitya", "Hindi-1", "Hindi-2", "Hindi-3", "Hindi-4", "Hindi-5",
      "Hindi-6", "Hindi-7", "Hindi-8", "Hindi-9", "Hindi-10", "Hindi-11", "Hindi-12"
    ]),
    English: createChapterStructure([
      "Beehive-1", "Beehive-2", "Beehive-3", "Beehive-4", "Beehive-5",
      "Beehive-6", "Beehive-7", "Beehive-8", "Beehive-9", "Beehive-10",
      "Beehive-11", "Poem-1", "Poem-2", "Poem-3", "Poem-4", "Poem-5",
      "Poem-6", "Poem-7", "Poem-8", "Poem-9", "Poem-10", "English-1",
      "English-2", "English-3", "English-4", "English-5", "English-6", "English-7"
    ])
  },
  10: {
    Mathematics: createChapterStructure([
      "Real Numbers", "Polynomials", "Pair of Linear Equations", "Quadratic Equations",
      "Arithmetic Progressions", "Triangles", "Coordinate Geometry", "Circles",
      "Constructions", "Areas", "Volume & Surface Area", "Statistics", "Probability", "Trigonometry"
    ]),
    Science: createChapterStructure([
      "Life Processes", "Acids Bases Salts", "Metals and Non-metals"
    ]),
    SST: createChapterStructure([
      "Nationalism India", "Making Constitution", "Electoral Politics", "Working Institutions",
      "Democratic Rights", "India Resources", "Forest Society", "Pastoralists",
      "Peasants Zamindari", "History-1", "History-2", "History-3", "History-4", "History-5",
      "Geography-1", "Geography-2", "Geography-3", "Geography-4", "Geography-5", "Geography-6"
    ]),
    Hindi: createChapterStructure([
      "Sparsh", "Sanchayan", "Kritika", "Hindi-1", "Hindi-2", "Hindi-3", "Hindi-4", "Hindi-5", "Hindi-6"
    ]),
    English: createChapterStructure([
      "First Flight-1", "First Flight-2", "First Flight-3", "First Flight-4", "First Flight-5",
      "First Flight-6", "First Flight-7", "First Flight-8", "First Flight-9", "First Flight-10",
      "Poem-1", "Poem-2", "Poem-3", "Poem-4", "Poem-5", "Poem-6", "Poem-7", "Poem-8",
      "Footprints-1", "Footprints-2", "Footprints-3", "Footprints-4", "Footprints-5"
    ])
  },
  11: {
    Mathematics: createChapterStructure([
      "Sets", "Relations Functions", "Trigonometric Functions", "Mathematical Induction",
      "Complex Numbers", "Linear Inequalities", "Permutations Combinations", "Binomial Theorem",
      "Sequences Series", "Straight Lines", "Conic Sections", "3D Geometry",
      "Limits Derivatives", "Statistics", "Probability"
    ]),
    Science: createChapterStructure([
      "Physical World", "Units Measurement", "Motion 1D", "Motion 2D", "Forces",
      "Work Energy Power", "Rotation", "Oscillations", "Waves", "Gravitation", "Fluid Mechanics",
      "Basic Concepts", "Structure Atom", "Periodic Table", "Chemical Bonding", "States Matter",
      "Thermodynamics", "Equilibrium", "Redox Reactions", "Hydrogen", "s-Block", "p-Block",
      "Living World", "Biological Classification", "Plant Kingdom", "Animal Kingdom",
      "Cell Life", "Biomolecules", "Cell Cycle"
    ]),
    Arts: createChapterStructure([
      "Beginning Time", "Writing City Life", "Empire Continents", "Central Islamic", "Nomadic Empires",
      "Three Orders", "Changing Traditions", "Confrontation Cultures", "Industrial Revolution",
      "Displacing Indigenous", "Paths Modernisation", "Discipline", "Infrastructure",
      "Environment Development", "Comparative Development", "Political Theory", "Introduction Economics"
    ])
  },
  12: {
    Mathematics: createChapterStructure([
      "Relations Functions", "Inverse Trigonometric", "Matrices", "Determinants",
      "Continuity Differentiability", "Applications Derivatives", "Integrals",
      "Applications Integrals", "Differential Equations", "Vector Algebra",
      "3D Geometry", "Linear Programming", "Probability"
    ]),
    Science: createChapterStructure([
      "Electric Charges", "Electrostatic Potential", "Current Electricity", "Moving Charges",
      "Magnetism Matter", "Electromagnetic Induction", "Alternating Current", "EM Waves",
      "Ray Optics", "Wave Optics", "Dual Nature Radiation", "Atoms Nuclei",
      "Semiconductor Devices", "Communication System"
    ]),
    SST: createChapterStructure([
      "Bricks into Structures", "Kings Farmers", "Kinship Caste", "Thinkers Beliefs",
      "Textiles Society", "Books Records", "Bhakti Sufi", "Mughal State",
      "Colonialism City", "Colonial State", "Changing Life", "Peasants Rebellion",
      "Community Identities", "Custodians Past", "Framing Constitution", "Markets Exchange",
      "Money Finance", "Nationalism Movement", "Gandhi Nation", "Partition Independence",
      "India After Independence", "Liberalisation Globalisation"
    ]),
    Hindi: createChapterStructure([
      "Antara", "Aroh", "Vitan", "Hindi-1", "Hindi-2", "Hindi-3", "Hindi-4",
      "Hindi-5", "Hindi-6", "Hindi-7", "Hindi-8", "Hindi-9", "Hindi-10"
    ]),
    English: createChapterStructure([
      "Flamingo-1", "Flamingo-2", "Flamingo-3", "Flamingo-4", "Flamingo-5", "Flamingo-6",
      "Poetry-1", "Poetry-2", "Poetry-3", "Poetry-4", "Poetry-5", "Vistas-1", "Vistas-2", "Vistas-3"
    ]),
    Accountancy: createChapterStructure([
      "Accounting System", "Financial Statements", "Adjustments", "Depreciation",
      "Receivables", "Bank Reconciliation", "Inventory", "Errors Rectification",
      "Bills Receivable", "Company Accounts", "Partnership", "Dissolution"
    ]),
    Economics: createChapterStructure([
      "Microeconomics", "Consumer Equilibrium", "Producer", "Market Structures",
      "National Income", "Money Banking", "Government Budget", "International Economics"
    ]),
    "Political Science": createChapterStructure([
      "Constitution Politics", "Federalism", "Elections", "Working Constitution",
      "Rights Duties", "Democratic Institutions", "Public Opinion", "Social Movements",
      "Global Politics", "International Organizations", "Development", "Challenges"
    ])
  }
};

function getDailyQuestions(className, subject, chapter) {
  const questionsArray = chapterQuestions[className]?.[subject]?.[chapter];
  if (!questionsArray) return null;
  return questionsArray.map((q, i) => ({ ...q, id: i }));
}

module.exports = { getDailyQuestions, chapterQuestions };

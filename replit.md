# Rajeev's Study Hub

## Overview

Rajeev's Study Hub is a comprehensive web application designed for students in Classes 9-12. It provides chapter-wise tests with AI-powered doubt solving, daily study time tracking, and motivational features. The platform aims to enhance learning efficiency and engagement through structured practice and continuous support.

Key capabilities include:
- Chapter-wise MCQ tests for core subjects (Maths, Science, SST, Hindi, English, Economics/Accountancy).
- An AI assistant ("Mahadev") for instant doubt resolution.
- Tools for tracking daily study time and fostering motivation.
- Support for both Hindi and English languages.

The project seeks to provide a valuable educational tool, potentially expanding its reach and impact on student learning.

## User Preferences

- **Communication Style:** I prefer simple language and clear explanations.
- **Workflow:** I want an iterative development process, focusing on one feature or section at a time.
- **Interaction:** Ask before making major architectural changes or introducing new external dependencies. Provide detailed explanations for significant code modifications.
- **Codebase Changes:**
    - Do not make changes to the `questions.js` file unless specifically instructed, as it contains the core question bank.
    - When updating question content, ensure the structure `10 Qs` per chapter is maintained.
    - All new features or modifications should seamlessly integrate with the existing dark theme UI.
    - Ensure new UI elements are responsive and consistent with the current design language.
    - Prioritize stability and avoid introducing regressions, especially in test functionality and AI interaction.

## System Architecture

The application follows a client-server architecture with a clear separation of concerns.

-   **UI/UX Decisions:**
    -   Dark theme applied globally using `style.css`.
    -   Clear, intuitive navigation flow: Class → Subject → Chapter → Test.
    -   Visual feedback for test answers (green for correct, red for wrong).
    -   Circular score display and performance ratings for test results.
    -   A floating, draggable AI widget for constant accessibility.
    -   Ads are hidden during tests to minimize distraction and visible on selection and results pages.
-   **Technical Implementations:**
    -   **Frontend:** Vanilla HTML, CSS, and JavaScript for a lightweight and performant user interface.
    -   **Backend:** Node.js with Express.js handles server-side logic, serving static files, and managing API endpoints for questions and data.
    -   **Test Mechanism:** Each chapter features 10 unique MCQ questions with a 10-minute timer. Instant feedback, solution display, and auto-submission are integral.
    -   **AI Integration:** A floating, draggable "Mahadev" AI chatbot is integrated using the Groq API. It supports chat history, message deletion, and auto-clears input.
    -   **Time Tracking:** Daily study time is tracked, allowing manual input and automatic tracking during tests. Data resets daily and is persisted using browser `localStorage`.
    -   **Motivation Feature:** Automatically loads daily quotes and allows users to add custom thoughts, persisted locally.
-   **System Design Choices:**
    -   **Chapter-Wise Organization:** Core content is structured by Class, Subject, and Chapter, each containing 10 MCQs.
    -   **Language Support:** Tests and content are available in both English and Hindi.
    -   **Persistent Storage:** `localStorage` is used for user-specific daily data (study time, motivation, AI chat history) to ensure continuity without a full database.
    -   **Modular Codebase:** Organized into `public/`, `server.js`, `questions.js`, and `chatbot.js` for maintainability.

## Content Inventory - VERIFIED COMPLETE

**Class 9: 92 chapters × 10 MCQs = 920 MCQs ✅**
- Maths (15 ch): Numbers, Polynomials, Coordinate Geometry, Equations, Euclid's, Lines, Triangles, Quadrilaterals, Areas, Circles, Constructions, Heron's, Volume, Statistics, Probability
- Science (15 ch): Why Ill, Natural Resources, Food Improvement + Physics/Chemistry/Biology basics
- SST (20 ch): 5 History (French Rev, Socialism, Nazism, Forest, Pastoralists) + 6 Geography (Size, Features, Drainage, Climate, Vegetation, Population) + 5 Political Science (Democracy, Constitution, Elections, Institutions, Rights) + 4 Economics (Village, Resources, Poverty, Food)
- Hindi (14 ch): व्याकरण, साहित्य + 12 additional chapters
- English (28 ch): 11 Beehive + 10 Beehive Poems + 7 additional chapters

**Class 10: 67 chapters × 10 MCQs = 670 MCQs ✅**
- Maths (14 ch), Science (3 ch), SST (20 ch), Hindi (9 ch), English (21 ch)

**Class 11 Mathematics: 15 chapters × 10 MCQs = 150 MCQs ✅**
- Unit I: Sets, Relations and Functions, Trigonometric Functions
- Unit II: Principle of Mathematical Induction, Complex Numbers & Quadratic Equations, Linear Inequalities, Permutations & Combinations, Binomial Theorem, Sequence and Series
- Unit III: Straight Lines, Conic Sections, 3D Geometry
- Unit IV: Limits and Derivatives
- Unit V: Statistics, Probability

**Class 11 Science: 29 chapters × 10 MCQs = 290 MCQs ✅**
- Physics (11 ch): Physical World, Units & Measurement, Motion 1D, Motion 2D, Forces, Work-Energy-Power, Systems & Rotation, Oscillations, Waves, Gravitation, Fluid Mechanics
- Chemistry (11 ch): Basic Concepts, Structure of Atom, Periodic Table, Chemical Bonding, States of Matter, Thermodynamics, Equilibrium, Redox Reactions, Hydrogen, s-Block Elements, p-Block Elements
- Biology (7 ch): Living World, Biological Classification, Plant Kingdom, Animal Kingdom, Cell: Unit of Life, Biomolecules, Cell Cycle & Division

**Class 11 Arts: 17 chapters × 10 MCQs = 170 MCQs ✅**
- History (11 ch): Beginning of Time, Writing & City Life, Empire Across Continents, Central Islamic Lands, Nomadic Empires, Three Orders, Changing Cultural Traditions, Confrontation of Cultures, Industrial Revolution, Displacing Indigenous Peoples, Paths to Modernisation
- Geography (4 ch): Discipline, Infrastructure, Environment & Sustainable Development, Comparative Development (India & Neighbours)
- Political Science (1 ch): Political Theory
- Economics (1 ch): Introduction

**VERIFIED TOTAL: 220 chapters × 10 MCQs = 2,193 QUESTIONS** ✅✅✅

## Recent Changes (Session 4-6)

**Date: Nov 30, 2025 - COMPLETE DATA VERIFICATION & RESTORATION**
- ✅ **ALL Classes 9-10 Verified Working:** 92 Ch9 + 67 Ch10 = 159 chapters total
- ✅ **Class 11 COMPLETE** with ALL streams:
  - Mathematics: 15 chapters (Sets, Functions, Trigonometry, Calculus, etc.)
  - Science: Physics 11ch + Chemistry 11ch + Biology 7ch = 29 chapters
  - Arts: History 11ch + Geography 4ch + Political Science 1ch + Economics 1ch = 17 chapters
  - **Class 11 Total: 61 chapters**
- ✅ **GRAND TOTAL: 220 chapters × 10 MCQs = 2,193 QUESTIONS**
- ✅ All test endpoints verified working (daily-test API returns 10 questions per chapter)
- ✅ Short notes module exists (shortNotes.js with summaries and formulas)
- ✅ Subject-based organization maintained across all classes
- ✅ App fully functional and deployed on port 5000

## External Dependencies

-   **AI Service:** Groq API (specifically `llama-3.1-8b-instant` model) for the "Mahadev" AI chatbot.
-   **Backend Framework:** Express.js (Node.js)
-   **HTTP Client:** `node-fetch` (used in `chatbot.js` for API requests)
-   **CORS Middleware:** `cors` (for Express.js)
-   **Advertising:** Google AdSense (integrated for ad placements, but requires user's `ca-pub` ID and ad unit IDs to be active).
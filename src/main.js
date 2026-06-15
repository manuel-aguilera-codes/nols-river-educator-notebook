import "./styles/main.scss";

import { FLASHCARDS } from "./data/flashcards.js";
import { QUIZ } from "./data/quiz.js";
import { SECTIONS } from "./data/sections.js";
import { initFlashcards } from "./features/flashcards.js";
import { initNavigation } from "./features/navigation.js";
import { initQuiz } from "./features/quiz.js";
import { initSearch } from "./features/search.js";

const nav = document.getElementById("nav");
const { showSection } = initNavigation(SECTIONS, nav);

initSearch(SECTIONS, nav, showSection);
initFlashcards(FLASHCARDS);
initQuiz(QUIZ);


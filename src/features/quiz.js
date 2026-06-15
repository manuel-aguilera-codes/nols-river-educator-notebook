function shuffle(items) {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function initQuiz(quiz) {
  let questionIndex = 0;
  let score = 0;
  let missed = [];
  let shuffledQuestions = [];

  const startPanel = document.getElementById("quiz-start");
  const quizArea = document.getElementById("quiz-area");
  const resultPanel = document.getElementById("quiz-result");
  const startButton = document.getElementById("quiz-start-btn");
  const nextButton = document.getElementById("q-next-btn");
  const resetButton = document.getElementById("quiz-reset-btn");

  startButton.addEventListener("click", startQuiz);
  nextButton.addEventListener("click", nextQuestion);
  resetButton.addEventListener("click", resetQuiz);

  function startQuiz() {
    shuffledQuestions = shuffle(quiz);
    questionIndex = 0;
    score = 0;
    missed = [];

    startPanel.style.display = "none";
    quizArea.style.display = "block";
    resultPanel.style.display = "none";

    renderQuestion();
  }

  function renderQuestion() {
    const question = shuffledQuestions[questionIndex];

    document.getElementById("q-prog").textContent =
      `Question ${questionIndex + 1} of ${shuffledQuestions.length}`;
    document.getElementById("q-fill").style.width =
      (questionIndex / shuffledQuestions.length) * 100 + "%";
    document.getElementById("q-meta").textContent = question.ch;
    document.getElementById("q-text").textContent = question.q;

    const options = document.getElementById("q-opts");
    const feedback = document.getElementById("q-feedback");

    options.innerHTML = "";
    feedback.className = "q-feedback";
    feedback.textContent = "";
    nextButton.style.display = "none";

    question.opts.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "q-opt";
      button.textContent = option;
      button.addEventListener("click", () => answerQuestion(index, question, button));
      options.appendChild(button);
    });
  }

  function answerQuestion(selectedIndex, question, button) {
    document
      .querySelectorAll(".q-opt")
      .forEach((optionButton) => optionButton.classList.add("disabled"));

    const options = document.querySelectorAll(".q-opt");
    const feedback = document.getElementById("q-feedback");

    if (selectedIndex === question.a) {
      button.classList.add("correct");
      score++;
      feedback.className = "q-feedback show ok";
      feedback.textContent = "Correct. " + question.exp;
    } else {
      button.classList.add("wrong");
      options[question.a].classList.add("correct");
      feedback.className = "q-feedback show bad";
      feedback.textContent = "Incorrect. " + question.exp;
      missed.push({
        q: question.q,
        correct: question.opts[question.a],
        ch: question.ch,
      });
    }

    nextButton.style.display = "inline-block";
  }

  function nextQuestion() {
    questionIndex++;

    if (questionIndex >= shuffledQuestions.length) {
      showResult();
      return;
    }

    renderQuestion();
  }

  function showResult() {
    quizArea.style.display = "none";
    resultPanel.style.display = "block";

    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    document.getElementById("q-score").textContent =
      `${score}/${shuffledQuestions.length} (${percentage}%)`;

    let verdict = "";

    if (percentage >= 90) verdict = "Excellent. River-ready.";
    else if (percentage >= 75)
      verdict = "Solid. Review the sections where you missed.";
    else if (percentage >= 60)
      verdict = "On the right track. Go back through the material carefully.";
    else verdict = "Worth re-reading the REN before the expedition.";

    document.getElementById("q-verdict").textContent = verdict;

    const missedWrap = document.getElementById("missed-wrap");
    const missedList = document.getElementById("missed-list");

    if (missed.length > 0) {
      missedWrap.style.display = "block";
      missedList.innerHTML = missed
        .map(
          (item) =>
            `<div class="missed-item"><em>${item.ch}</em><br><strong>${item.q}</strong><br>Correct answer: ${item.correct}</div>`,
        )
        .join("");
    } else {
      missedWrap.style.display = "none";
    }
  }

  function resetQuiz() {
    resultPanel.style.display = "none";
    startPanel.style.display = "block";
    quizArea.style.display = "none";
  }
}


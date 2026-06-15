export function initFlashcards(flashcards) {
  const grid = document.getElementById("fc-grid");

  flashcards.forEach((flashcard) => {
    const card = document.createElement("div");
    card.className = "fc";
    card.innerHTML = `
      <div class="fc-term">${flashcard.term.replace(/\n/g, "<br>")}</div>
      <div class="fc-def">${flashcard.def.replace(/\n/g, "<br>")}</div>
    `;
    card.addEventListener("click", () => card.classList.toggle("flipped"));
    grid.appendChild(card);
  });
}


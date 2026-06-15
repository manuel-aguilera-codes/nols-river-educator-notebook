function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function initSearch(sections, nav, showSection) {
  const searchEl = document.getElementById("search");
  const searchResults = document.getElementById("search-results");

  searchEl.addEventListener("input", () => {
    const query = searchEl.value.trim().toLowerCase();

    searchResults.style.display = "none";
    searchResults.innerHTML = "";

    if (query.length < 2) return;

    const results = [];

    document.querySelectorAll(".section").forEach((section) => {
      const text = stripHtml(section.innerHTML);
      const index = text.toLowerCase().indexOf(query);

      if (index >= 0) {
        const title =
          section.querySelector(".chapter-title")?.textContent || section.id;
        const snippet = text
          .substring(Math.max(0, index - 40), index + 80)
          .replace(/\n/g, " ");
        const highlighted = snippet.replace(
          new RegExp(`(${escapeRegExp(query)})`, "gi"),
          '<span class="sr-highlight">$1</span>',
        );

        results.push({
          id: section.id,
          title,
          snippet: highlighted,
        });
      }
    });

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="sr-item">No results for "${searchEl.value}".</div>`;
      searchResults.style.display = "block";
      return;
    }

    results.forEach((result) => {
      const item = document.createElement("div");
      item.className = "sr-item";
      item.innerHTML = `<strong>${result.title}</strong>...${result.snippet}...`;
      item.addEventListener("click", () => {
        const navIndex = sections.findIndex((section) => section.id === result.id);

        if (navIndex >= 0) {
          showSection(result.id, nav.children[navIndex]);
        }

        searchResults.style.display = "none";
        searchEl.value = "";
      });

      searchResults.appendChild(item);
    });

    searchResults.style.display = "block";
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#search-wrap")) {
      searchResults.style.display = "none";
    }
  });
}


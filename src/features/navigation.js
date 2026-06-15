export function initNavigation(sections, nav) {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenuQuery = window.matchMedia("(max-width: 860px)");

  sections.forEach((section) => {
    const button = document.createElement("button");
    button.className = "nav-btn";
    button.textContent = section.label;
    button.addEventListener("click", () => showSection(section.id, button));
    nav.appendChild(button);
  });

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!nav.classList.contains("open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      mobileMenuQuery.matches &&
      nav.classList.contains("open") &&
      !event.target.closest("#nav") &&
      !event.target.closest("#menu-toggle")
    ) {
      setMenuOpen(false);
    }
  });

  mobileMenuQuery.addEventListener("change", (event) => {
    if (!event.matches) {
      setMenuOpen(false);
    }
  });

  function setMenuOpen(isOpen) {
    nav.classList.toggle("open", isOpen);
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close chapter menu" : "Open chapter menu",
    );
  }

  function showSection(id, button) {
    document
      .querySelectorAll(".section")
      .forEach((section) => section.classList.remove("active"));

    document
      .querySelectorAll(".nav-btn")
      .forEach((navButton) => navButton.classList.remove("active"));

    const section = document.getElementById(id);

    if (section) {
      section.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (button) {
      button.classList.add("active");

      if (mobileMenuQuery.matches) {
        setMenuOpen(false);
      }
    }
  }

  showSection("s0", nav.children[0]);

  return { showSection };
}

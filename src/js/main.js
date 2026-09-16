(() => {
  const panel = document.getElementById("filterPanel");
  const clear = document.getElementById("filterClear");
  const chips = Array.from(document.querySelectorAll(".filter-panel .filter-chip"));
  const lists = [
    document.getElementById("experienceList"),
    document.getElementById("projectList"),
  ].filter(Boolean);

  const active = new Set();

  function applyFilter() {
    const hasFilter = active.size > 0;
    clear.hidden = !hasFilter;
    document.querySelectorAll(".filter-chip").forEach((c) =>
      c.classList.toggle("is-active", active.has(c.dataset.tool))
    );
    lists.forEach((list) => {
      list.querySelectorAll(".timeline-item, .project-row").forEach((item) => {
        const tools = (item.dataset.tools || "").split(" ").filter(Boolean);
        const match = !hasFilter || tools.length === 0 || tools.some((t) => active.has(t));
        item.classList.toggle("is-dimmed", !match);
        item.inert = !match;
      });
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const tool = chip.dataset.tool;
      if (active.has(tool)) {
        active.delete(tool);
      } else {
        active.add(tool);
      }
      applyFilter();
    });
  });

  clear.addEventListener("click", () => {
    active.clear();
    applyFilter();
  });

  const buffer = 40;

  function staggerIn() {
    chips.forEach((chip, i) => {
      chip.style.transitionDelay = `${Math.min(i * 18, 250)}ms`;
    });
    setTimeout(() => {
      chips.forEach((chip) => (chip.style.transitionDelay = ""));
    }, 700);
  }

  let raf = 0;
  let lastY = window.scrollY;
  function updatePanel() {
    const rect = panel.getBoundingClientRect();
    const entering = rect.top <= window.innerHeight - buffer;
    const goingUp = window.scrollY < lastY;
    if (goingUp && !entering) {
      panel.classList.remove("is-visible");
    } else if (entering) {
      if (!panel.classList.contains("is-visible")) staggerIn();
      panel.classList.add("is-visible");
    }
    lastY = window.scrollY;
  }

  function onScroll() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      updatePanel();
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  updatePanel();
})();
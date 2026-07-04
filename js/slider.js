export function initSlider(sectionSelector, listSelector, dotsSelector) {
  const section = document.querySelector(sectionSelector);
  const list = document.querySelector(listSelector);

  if (!section || !list) return;

  const buttons = section.querySelectorAll(".pagination-btn");

  if (buttons.length < 2) return;

  const [prevBtn, nextBtn] = buttons;

  const dotsContainer = dotsSelector
    ? section.querySelector(dotsSelector)
    : null;

  const paginationContainer = section.querySelector(".pagination-container");

  let dots = dotsContainer ? [...dotsContainer.querySelectorAll(".dot")] : [];

  let currentIndex = 0;
  let isAnimating = false;

  const TRANSITION_MS = 300;

  function getVisibleCards() {
    if (window.innerWidth >= 1440) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }

  function getCards() {
    return [...list.children];
  }

  function getMaxIndex(cards, visible) {
    return Math.max(0, cards.length - visible);
  }

  function getTotalPages(cards, visible) {
    if (!cards.length) return 1;

    return Math.max(1, Math.ceil(cards.length / visible));
  }

  function renderDots(cards, visible) {
    if (!dotsContainer) return;

    const totalPages = getTotalPages(cards, visible);

    dotsContainer.innerHTML = "";
    dots = [];

    for (let i = 0; i < totalPages; i += 1) {
      const dot = document.createElement("li");
      dot.className = "dot";
      dot.setAttribute("role", "button");
      dot.setAttribute("tabindex", "0");
      dot.setAttribute("aria-label", `Go to page ${i + 1}`);

      const activateDot = () => {
        goTo(Math.min(i * visible, getMaxIndex(cards, visible)));
      };

      dot.addEventListener("click", activateDot);
      dot.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateDot();
        }
      });

      dotsContainer.appendChild(dot);
      dots.push(dot);
    }
  }

  function update() {
    const cards = getCards();
    const visible = getVisibleCards();
    const maxIndex = getMaxIndex(cards, visible);
    const totalPages = getTotalPages(cards, visible);

    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }

    cards.forEach((card, index) => {
      if (
        index >= currentIndex &&
        index < currentIndex + visible
      ) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });

    const isStart = currentIndex === 0;
    const isEnd = currentIndex >= maxIndex;

    prevBtn.disabled = isStart;
    prevBtn.classList.toggle("disabled", isStart);

    nextBtn.disabled = isEnd;
    nextBtn.classList.toggle("disabled", isEnd);

    if (paginationContainer) {
      paginationContainer.hidden = totalPages <= 1;
    }

    if (dotsContainer && dots.length !== totalPages) {
      renderDots(cards, visible);
    }

    if (dots.length) {
      const activeDot = Math.min(
        Math.round(currentIndex / visible),
        dots.length - 1
      );

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === activeDot);
      });
    }
  }

  function goTo(newIndex) {
    if (isAnimating || newIndex === currentIndex) return;

    isAnimating = true;
    list.classList.add("is-switching");

    window.setTimeout(() => {
      currentIndex = newIndex;
      update();

      void list.offsetWidth;

      list.classList.remove("is-switching");
      isAnimating = false;
    }, TRANSITION_MS);
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1);
    }
  });

  nextBtn.addEventListener("click", () => {
    const cards = getCards();

    if (currentIndex < cards.length - getVisibleCards()) {
      goTo(currentIndex + 1);
    }
  });

  window.addEventListener("resize", update);

  renderDots(getCards(), getVisibleCards());
  update();
}

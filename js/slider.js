export function initSlider(sectionSelector, listSelector, dotsSelector) {
  const section = document.querySelector(sectionSelector);
  const list = document.querySelector(listSelector);

  if (!section || !list) return;

  const buttons = section.querySelectorAll(".pagination-btn");

  if (buttons.length < 2) return;

  const [prevBtn, nextBtn] = buttons;

  const dots = dotsSelector
    ? [...section.querySelectorAll(`${dotsSelector} .dot`)]
    : [];

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

  function update() {
    const cards = getCards();
    const visible = getVisibleCards();

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
    const isEnd = currentIndex >= cards.length - visible;

    prevBtn.disabled = isStart;
    prevBtn.classList.toggle("disabled", isStart);

    nextBtn.disabled = isEnd;
    nextBtn.classList.toggle("disabled", isEnd);

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

      // force reflow so the browser registers the new state
      // before removing the class, otherwise no transition plays
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

  update();
}
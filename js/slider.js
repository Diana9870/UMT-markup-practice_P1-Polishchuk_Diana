export function initSlider(sectionSelector, listSelector, dotsSelector = null) {
  const section = document.querySelector(sectionSelector);
  const list = document.querySelector(listSelector);

  if (!section || !list) return;

  const buttons = section.querySelectorAll(".pagination-btn");
  const prevBtn = buttons[0];
  const nextBtn = buttons[1];

  const dots = dotsSelector
    ? document.querySelectorAll(`${dotsSelector} .dot`)
    : [];

  function getCardWidth() {
    const card = list.querySelector("li");

    if (!card) return 320;

    const gap = parseInt(getComputedStyle(list).gap) || 24;

    return card.offsetWidth + gap;
  }

  function maxScroll() {
    return list.scrollWidth - list.clientWidth;
  }

  function updateButtons() {
    prevBtn.disabled = list.scrollLeft <= 5;
    nextBtn.disabled = list.scrollLeft >= maxScroll() - 5;

    prevBtn.classList.toggle("disabled", prevBtn.disabled);
    nextBtn.classList.toggle("disabled", nextBtn.disabled);
  }

  function updateDots() {
    if (!dots.length) return;

    const index = Math.round(list.scrollLeft / getCardWidth());

    dots.forEach(dot => dot.classList.remove("active"));

    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  prevBtn.addEventListener("click", () => {
    list.scrollBy({
      left: -getCardWidth(),
      behavior: "smooth",
    });
  });

  nextBtn.addEventListener("click", () => {
    list.scrollBy({
      left: getCardWidth(),
      behavior: "smooth",
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      list.scrollTo({
        left: index * getCardWidth(),
        behavior: "smooth",
      });
    });
  });

  list.addEventListener("scroll", () => {
    updateButtons();
    updateDots();
  });

  window.addEventListener("resize", () => {
    updateButtons();
    updateDots();
  });

  updateButtons();
  updateDots();
}
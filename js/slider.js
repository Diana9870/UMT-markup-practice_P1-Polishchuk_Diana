export function initSlider(sectionSelector, listSelector) {
  const section = document.querySelector(sectionSelector);
  const list = document.querySelector(listSelector);

  if (!section || !list) return;

  const buttons = section.querySelectorAll(".pagination-btn");

  if (buttons.length < 2) return;

  const [prevBtn, nextBtn] = buttons;

  let currentIndex = 0;

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

    prevBtn.disabled = currentIndex === 0;

    nextBtn.disabled =
      currentIndex >= cards.length - visible;
  }

  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      update();
    }
  });

  nextBtn.addEventListener("click", () => {
    const cards = getCards();

    if (currentIndex < cards.length - getVisibleCards()) {
      currentIndex++;
      update();
    }
  });

  window.addEventListener("resize", update);

  update();
}
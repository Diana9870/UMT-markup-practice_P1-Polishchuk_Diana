const bouquetList = document.querySelector(".bouquet-list");

export function createCard(flower) {
  return `
    <li class="bouquet-card">
      <img
        class="bouquet-img"
        src="${flower.image}"
        alt="${flower.name}"
        width="296"
        height="296"
        loading="lazy"
      >

      <h3 class="bouquet-name">
        ${flower.name}
      </h3>

      <p class="bouquet-text">
        ${flower.description}
      </p>

      <p class="bouquet-price">
        $${flower.price}
      </p>
    </li>
  `;
}

export function renderFlowers(flowers) {

  const markup = flowers
    .map(createCard)
    .join("");

  bouquetList.insertAdjacentHTML("beforeend", markup);
}

export function clearFlowers() {
  bouquetList.innerHTML = "";
}
const IMAGE_PATH = `${import.meta.env.BASE_URL}images/`;

function createBestsellerMarkup({
  title,
  description,
  price,
  image,
  image2x,
}) {
  return `
    <li class="card">
      <img
        class="top-selling-img"
        src="${IMAGE_PATH}${image}"
        srcset="${IMAGE_PATH}${image} 1x, ${IMAGE_PATH}${image2x} 2x"
        alt="${title}"
        width="405"
        height="320"
        loading="lazy"
      />

      <h3 class="top-selling-title">
        ${title}
      </h3>

      <p class="top-selling-text">
        ${description}
      </p>

      <p class="top-selling-price">
        $${price}
      </p>
    </li>
  `;
}

export function renderBestsellers(list, items) {
  list.innerHTML = '';

  const markup = items
    .map(createBestsellerMarkup)
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
}

function createBouquetMarkup({
  title,
  description,
  price,
  image,
  image2x,
}) {
  return `
    <li class="bouquet-card">

      <img
        class="bouquet-img"
        src="${IMAGE_PATH}${image}"
        srcset="${IMAGE_PATH}${image} 1x, ${IMAGE_PATH}${image2x} 2x"
        alt="${title}"
        width="296"
        height="296"
        loading="lazy"
      >

      <h3 class="bouquet-name">
        ${title}
      </h3>

      <p class="bouquet-text">
        ${description}
      </p>

      <p class="bouquet-price">
        $${price}
      </p>

    </li>
  `;
}

export function renderBouquets(list, bouquets, append = false) {
  const markup = bouquets
    .map(createBouquetMarkup)
    .join('');

  if (!append) {
    list.innerHTML = '';
  }

  list.insertAdjacentHTML('beforeend', markup);
}

function createFeedbackMarkup({
  author,
  text,
}) {
  return `
    <li class="feedback-card">

      <p class="feedback-quote">
        "${text}"
      </p>

      <p class="feedback-author">
        ${author}
      </p>

    </li>
  `;
}

export function renderFeedback(list, feedback) {
  list.innerHTML = '';

  const markup = feedback
    .map(createFeedbackMarkup)
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
}

export function renderLoading(list) {
  list.innerHTML = `
    <li class="loading">
      Loading...
    </li>
  `;
}

export function renderError(list) {
  list.innerHTML = `
    <li class="error">
      Something went wrong.
      Please try again later.
    </li>
  `;
}

export function renderEmpty(list) {
  list.innerHTML = `
    <li class="empty">
      No bouquets found.
    </li>
  `;
}
const IMAGE_PATH = `${import.meta.env.BASE_URL}`;
const API_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://flora-api-q559.onrender.com';

function createBouquetMarkup({
  id,
  title,
  description,
  price,
  photoURL,
  image,
  image2x,
}) {
  const cover = photoURL
    ? `${API_URL}${photoURL}`
    : image
      ? `${IMAGE_PATH}${image}`
      : '';

  const srcset =
    !photoURL && image2x
      ? `srcset="${IMAGE_PATH}${image} 1x, ${IMAGE_PATH}${image2x} 2x"`
      : '';

  return `
    <li
      class="bouquet-card"
      data-id="${id}"
      tabindex="0"
      role="button"
      aria-label="View details for ${title}"
    >

      <img
        class="bouquet-img"
        src="${cover}"
        ${srcset}
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

export function renderBestsellers(list, items) {
  list.innerHTML = '';

  const markup = items
    .map(createBestsellerMarkup)
    .join('');

  list.insertAdjacentHTML('beforeend', markup);
}

function createBouquetMarkup({
  id,
  title,
  description,
  price,
  photoURL,
  image,
  image2x,
}) {
  const cover = photoURL || (image ? `${IMAGE_PATH}${image}` : '');
  const srcset = photoURL
    ? ''
    : image2x
      ? `srcset="${IMAGE_PATH}${image} 1x, ${IMAGE_PATH}${image2x} 2x"`
      : '';

  return `
    <li
      class="bouquet-card"
      data-id="${id}"
      tabindex="0"
      role="button"
      aria-label="View details for ${title}"
    >

      <img
        class="bouquet-img"
        src="${cover}"
        ${srcset}
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
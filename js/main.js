import {
  getBestsellers,
  getBouquets,
  getFeedback,
  createOrder,
  subscribe,
} from './api.js';

import {
  renderBestsellers,
  renderBouquets,
  renderFeedback,
  renderLoading,
  renderError,
  renderEmpty,
} from './render.js';

import { openProductModal } from './modal.js';
import '../css/styles.css';
import { initSlider } from './slider.js';

const API_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://flora-api-q559.onrender.com';

const IMAGE_PATH = import.meta.env.BASE_URL;

const bestsellersList = document.querySelector('#bestsellers-list');
const bouquetList = document.querySelector('#bouquet-list');
const feedbackList = document.querySelector('#feedback-list');

const loadMoreBtn = document.querySelector('#load-more-btn');

const orderForm = document.querySelector('#order-form');
const subscribeForm = document.querySelector('#subscribe-form');

const state = {
  page: 1,
  limit: 4,
  total: 0,
  category: '',
};

const bestsellersById = new Map();
const bouquetsById = new Map();

function toModalProduct(item) {
  if (item.photoURL) {
    const image = item.photoURL.startsWith('http')
      ? item.photoURL
      : `${API_URL}${item.photoURL}`;

    return {
      ...item,
      image,
      image2x: image,
    };
  }

  return {
    ...item,
    image: `${IMAGE_PATH}${item.image}`,
    image2x: item.image2x
      ? `${IMAGE_PATH}${item.image2x}`
      : `${IMAGE_PATH}${item.image}`,
  };
}

function handleCardActivate(event, itemsById) {
  const card = event.target.closest('[data-id]');

  if (!card) return;

  const product = itemsById.get(card.dataset.id);

  if (product) {
    openProductModal(toModalProduct(product));
  }
}

function handleCardKeydown(event, itemsById) {
  if (event.key !== 'Enter' && event.key !== ' ') return;

  const card = event.target.closest('[data-id]');

  if (!card) return;

  event.preventDefault();

  const product = itemsById.get(card.dataset.id);

  if (product) {
    openProductModal(toModalProduct(product));
  }
}

bestsellersList.addEventListener('click', event =>
  handleCardActivate(event, bestsellersById)
);
bestsellersList.addEventListener('keydown', event =>
  handleCardKeydown(event, bestsellersById)
);

bouquetList.addEventListener('click', event =>
  handleCardActivate(event, bouquetsById)
);
bouquetList.addEventListener('keydown', event =>
  handleCardKeydown(event, bouquetsById)
);

async function loadBestsellers() {
  try {
    renderLoading(bestsellersList);

    const response = await getBestsellers();
    const bestsellers = response?.bestsellers ?? [];

    bestsellersById.clear();

    if (bestsellers.length === 0) {
      renderEmpty(bestsellersList);
      return;
    }

    bestsellers.forEach(item => {
      bestsellersById.set(String(item.id), item);
    });

    renderBestsellers(bestsellersList, bestsellers);

    initSlider(
      '.sell-section',
      '.bestsellers-list',
      '.pagination-dots'
    );

  } catch (error) {
    console.error('Failed to load bestsellers:', error);
    renderError(bestsellersList);
  }
}

async function loadFeedback() {
  try {
    renderLoading(feedbackList);

    const response = await getFeedback();
    const feedback = response?.feedback ?? [];

    if (feedback.length === 0) {
      renderEmpty(feedbackList);
      return;
    }

    renderFeedback(feedbackList, feedback);

    initSlider(
      '.feedback-section',
      '.feedback-list'
    );

  } catch (error) {
    console.error('Failed to load feedback:', error);
    renderError(feedbackList);
  }
}

async function loadBouquets(append = false) {
  try {
    if (!append) {
      renderLoading(bouquetList);
    }

    const { bouquets, total } = await getBouquets({
      page: state.page,
      limit: state.limit,
      category: state.category,
    });

    state.total = total;

    if (!append && bouquets.length === 0) {
      bouquetsById.clear();
      renderEmpty(bouquetList);
      loadMoreBtn.hidden = true;
      return;
    }

    if (!append) {
      bouquetsById.clear();
    }
    bouquets.forEach(item => bouquetsById.set(String(item.id), item));

    renderBouquets(bouquetList, bouquets, append);

    updateLoadMoreButton();
  } catch (error) {
    console.error(error);

    renderError(bouquetList);
  }
}

function updateLoadMoreButton() {
  const loadedItems = state.page * state.limit;

  loadMoreBtn.hidden = loadedItems >= state.total;
}

loadMoreBtn.addEventListener('click', async () => {
  state.page += 1;

  await loadBouquets(true);
});

if (orderForm) {
  orderForm.addEventListener('submit', handleOrderSubmit);
}

async function handleOrderSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const formData = new FormData(form);

  const order = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    email: formData.get('email'),
    message: formData.get('message'),
  };

  try {
    await createOrder(order);

    alert('✅ Your order has been sent successfully!');

    form.reset();

    document
      .querySelector('[data-modal]')
      .classList.remove('is-open');

    document.body.classList.remove('modal-open');

  } catch (error) {
    console.error(error);

    alert('❌ Failed to send order.');
  }
}

if (subscribeForm) {
  subscribeForm.addEventListener('submit', handleSubscribe);
}

async function handleSubscribe(event) {
  event.preventDefault();

  const form = event.currentTarget;

  const formData = new FormData(form);

  const email = formData.get('email');

  try {

    await subscribe(email);

    alert('🌸 Thank you for subscribing!');

    form.reset();

  } catch (error) {

    console.error(error);

    alert('❌ Subscription failed.');

  }
}

export async function applyFilters({
  category = '',
}) {
  state.category = category;
  state.page = 1;

  await loadBouquets();
}

async function init() {
  await loadBestsellers();

  await loadFeedback();

  await loadBouquets();
}

init();
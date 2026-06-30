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

import './modal.js';
import './slider.js';

const bestsellersList = document.querySelector('#bestsellers-list');
const bouquetList = document.querySelector('#bouquet-list');
const feedbackList = document.querySelector('#feedback-list');

const loadMoreBtn = document.querySelector('#load-more-btn');

const orderForm = document.querySelector('#order-form');
const subscribeForm = document.querySelector('#subscribe-form');

const searchInput = document.querySelector('#search-input');

const state = {
  page: 1,
  limit: 4,
  total: 0,
  category: '',
  search: '',
};

async function loadBestsellers() {
  try {
    renderLoading(bestsellersList);

    const data = await getBestsellers();

    renderBestsellers(bestsellersList, data);
  } catch (error) {
    console.error(error);

    renderError(bestsellersList);
  }
}

async function loadFeedback() {
  try {
    renderLoading(feedbackList);

    const data = await getFeedback();

    renderFeedback(feedbackList, data);
  } catch (error) {
    console.error(error);

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
      search: state.search,
    });

    state.total = total;

    if (!append && bouquets.length === 0) {
      renderEmpty(bouquetList);
      loadMoreBtn.hidden = true;
      return;
    }

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

if (searchInput) {
  searchInput.addEventListener('input', debounceSearch);
}

let searchTimeout;

function debounceSearch(event) {
  clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    applyFilters({
      search: event.target.value.trim(),
    });
  }, 400);
}

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
  search = '',
}) {
  state.category = category;
  state.search = search;
  state.page = 1;

  await loadBouquets();
}

async function init() {
  await Promise.all([
    loadBestsellers(),
    loadFeedback(),
    loadBouquets(),
  ]);
}

init();
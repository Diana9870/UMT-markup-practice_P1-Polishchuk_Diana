import {
  getBestsellers,
  getBouquets,
  getFeedback,
} from './api';

import {
  renderBestsellers,
  renderBouquets,
  renderFeedback,
  renderLoading,
  renderError,
  renderEmpty,
} from './render';

import './modal.js';

const bestsellersList = document.querySelector('#bestsellers-list');
const bouquetList = document.querySelector('#bouquet-list');
const feedbackList = document.querySelector('#feedback-list');

const loadMoreBtn = document.querySelector('#load-more-btn');

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
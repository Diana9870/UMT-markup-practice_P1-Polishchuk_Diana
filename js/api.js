import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export async function getBouquets({
  page = 1,
  limit = 4,
  category = '',
  search = '',
} = {}) {
  const params = {
    _page: page,
    _limit: limit,
  };

  if (category) {
    params.category = category;
  }

  if (search) {
    params.title_like = search;
  }

  const response = await api.get('/bouquets', { params });

  return {
    bouquets: response.data,
    total: Number(response.headers['x-total-count']) || response.data.length,
  };
}

export async function getBestsellers() {
  const response = await api.get('/bestsellers');

  return response.data;
}

export async function getFeedback() {
  const response = await api.get('/feedback');

  return response.data;
}

export async function createOrder(order) {
  const response = await api.post('/orders', order);

  return response.data;
}

export async function subscribe(email) {
  const response = await api.post('/subscribers', {
    email,
  });

  return response.data;
}
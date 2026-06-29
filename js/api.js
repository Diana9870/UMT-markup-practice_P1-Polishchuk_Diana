import axios from 'axios';

// URL локального json-server
const LOCAL_API = 'http://localhost:3000';

// URL API після розгортання на Render
const PRODUCTION_API = 'https://YOUR-RENDER-URL.onrender.com';

// Автоматичний вибір API
const BASE_URL =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1'
    ? LOCAL_API
    : PRODUCTION_API;

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
  try {
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
  } catch (error) {
    console.error('Error loading bouquets:', error);
    throw new Error('Не вдалося завантажити букети.');
  }
}

export async function getBestsellers() {
  try {
    const response = await api.get('/bestsellers');
    return response.data;
  } catch (error) {
    console.error('Error loading bestsellers:', error);
    throw new Error('Не вдалося завантажити бестселери.');
  }
}

export async function getFeedback() {
  try {
    const response = await api.get('/feedback');
    return response.data;
  } catch (error) {
    console.error('Error loading feedback:', error);
    throw new Error('Не вдалося завантажити відгуки.');
  }
}

export async function createOrder(order) {
  try {
    const response = await api.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Не вдалося оформити замовлення.');
  }
}

export async function subscribe(email) {
  try {
    const response = await api.post('/subscribers', {
      email,
    });

    return response.data;
  } catch (error) {
    console.error('Error subscribing:', error);
    throw new Error('Не вдалося оформити підписку.');
  }
}
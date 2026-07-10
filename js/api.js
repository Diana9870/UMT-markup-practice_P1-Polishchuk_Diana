import axios from 'axios';

// Real backend (flora-api): bouquets, bestsellers, feedback.
const FLORA_API_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://flora-api-q559.onrender.com';

const floraApi = axios.create({
  baseURL: FLORA_API_URL,
});

// Mock backend: orders, subscribers — not implemented in flora-api yet.
// Point this at your json-server (or wherever those endpoints live) once
// it's available; kept separate from floraApi on purpose so the two
// don't get mixed up again.
const MOCK_API_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://flora-api-q559.onrender.com';

const mockApi = axios.create({
  baseURL: MOCK_API_URL,
});

export async function getBouquets({
  page = 1,
  limit = 4,
  category = '',
} = {}) {
  try {
    const params = { page, limit };

    if (category) {
      params.category = category;
    }

    const response = await floraApi.get('/api/bouquets', { params });

    return {
      bouquets: response.data.bouquets,
      total: response.data.total,
    };
  } catch (error) {
    console.error('Error loading bouquets:', error);
    throw new Error('Не вдалося завантажити букети.');
  }
}

export async function getBestsellers() {
  try {
    const response = await floraApi.get('/api/bestsellers');

    // Backend returns { bestsellers, total }; callers (main.js) expect a
    // plain array, so unwrap it here.
    return response.data.bestsellers;
  } catch (error) {
    console.error('Error loading bestsellers:', error);
    throw new Error('Не вдалося завантажити бестселери.');
  }
}

export async function getFeedback() {
  try {
    const response = await floraApi.get('/api/feedback');

    // Backend returns { feedback, total }; callers (main.js) expect a
    // plain array, so unwrap it here.
    return response.data.feedback;
  } catch (error) {
    console.error('Error loading feedback:', error);
    throw new Error('Не вдалося завантажити відгуки.');
  }
}

export async function createOrder(order) {
  try {
    const response = await mockApi.post('/orders', order);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Не вдалося оформити замовлення.');
  }
}

export async function subscribe(email) {
  try {
    const response = await mockApi.post('/subscribers', {
      email,
    });

    return response.data;
  } catch (error) {
    console.error('Error subscribing:', error);
    throw new Error('Не вдалося оформити підписку.');
  }
}
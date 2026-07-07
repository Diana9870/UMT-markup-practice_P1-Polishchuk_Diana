import axios from 'axios';

const FLORA_API_URL = import.meta.env.DEV
  ? 'http://localhost:3000'
  : 'https://flora-api-q559.onrender.com';

const floraApi = axios.create({
  baseURL: FLORA_API_URL,
});

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
    const response = await mockApi.get('/bestsellers');
    return response.data;
  } catch (error) {
    console.error('Error loading bestsellers:', error);
    throw new Error('Не вдалося завантажити бестселери.');
  }
}

export async function getFeedback() {
  try {
    const response = await mockApi.get('/feedback');
    return response.data;
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

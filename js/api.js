import axios from "axios";

const BASE_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export async function getFlowers(page = 1, limit = 4) {
  try {
    const response = await api.get("/flowers", {
      params: {
        _page: page,
        _per_page: limit,
      },
    });

    return response.data;

  } catch (error) {
    console.error("Error loading flowers:", error);
    throw error;
  }
}
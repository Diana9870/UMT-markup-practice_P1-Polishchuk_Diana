import { getFlowers } from "./api.js";
import { renderFlowers } from "./render.js";

const loadMoreBtn = document.querySelector(".bouquet-btn");

const state = {
  page: 1,
  limit: 4,
  totalPages: 1,
};

async function loadFlowers() {

  try {

    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Loading...";

    const data = await getFlowers(
      state.page,
      state.limit
    );

    renderFlowers(data.data);

    state.totalPages = data.pages;

    if (state.page >= state.totalPages) {

      loadMoreBtn.style.display = "none";

      const message = document.createElement("p");

      message.className = "end-message";

      message.textContent = "All bouquets have been loaded.";

      document
        .querySelector(".bouquet-container")
        .append(message);

    } else {

      loadMoreBtn.disabled = false;

      loadMoreBtn.textContent = "Show More";

    }

  } catch (error) {

    console.error(error);

    loadMoreBtn.style.display = "none";

    const message = document.createElement("p");

    message.className = "error-message";

    message.textContent =
      "Failed to load bouquets. Please try again later.";

    document
      .querySelector(".bouquet-container")
      .append(message);
  }

}

loadFlowers();

loadMoreBtn.addEventListener("click", () => {

  state.page++;

  loadFlowers();

});
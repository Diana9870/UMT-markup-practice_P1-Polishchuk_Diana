/* ===========================
   ORDER MODAL (contact form)
=========================== */

const orderBackdrop = document.querySelector('[data-modal]');
const orderOpenButtons = document.querySelectorAll('[data-modal-open]');
const orderCloseButton = document.querySelector('[data-modal-close]');
const orderMessageInput = document.querySelector('#message');

function openOrderModal() {
  if (!orderBackdrop) return;

  orderBackdrop.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeOrderModal() {
  if (!orderBackdrop) return;

  orderBackdrop.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

if (orderBackdrop && orderCloseButton && orderOpenButtons.length) {
  orderOpenButtons.forEach(button => {
    button.addEventListener('click', () => openOrderModal());
  });

  orderCloseButton.addEventListener('click', closeOrderModal);

  orderBackdrop.addEventListener('click', event => {
    if (event.target === orderBackdrop) {
      closeOrderModal();
    }
  });
}

/* ===========================
   PRODUCT DETAILS MODAL
=========================== */

const productBackdrop = document.querySelector('[data-product-modal]');
const productCloseButton = document.querySelector('[data-product-modal-close]');
const productImage = document.querySelector('[data-product-image]');
const productTitle = document.querySelector('[data-product-title]');
const productPrice = document.querySelector('[data-product-price]');
const productDescription = document.querySelector('[data-product-description]');
const productBuyButton = document.querySelector('[data-product-buy]');

const qtyValueEl = document.querySelector('[data-qty-value]');
const qtyIncreaseBtn = document.querySelector('[data-qty-increase]');
const qtyDecreaseBtn = document.querySelector('[data-qty-decrease]');

let currentProduct = null;
let quantity = 1;

function updateQuantityUI() {
  if (qtyValueEl) {
    qtyValueEl.textContent = String(quantity);
  }

  if (qtyDecreaseBtn) {
    qtyDecreaseBtn.disabled = quantity <= 1;
  }
}

export function openProductModal(product) {
  if (!productBackdrop || !product) return;

  currentProduct = product;
  quantity = 1;
  updateQuantityUI();

  if (productImage) {
    productImage.src = product.image;
    productImage.srcset = product.image2x
      ? `${product.image} 1x, ${product.image2x} 2x`
      : '';
    productImage.alt = product.title;
  }

  if (productTitle) {
    productTitle.textContent = product.title;
  }

  if (productPrice) {
    productPrice.textContent = `$${product.price}`;
  }

  if (productDescription) {
    productDescription.textContent = product.description;
  }

  productBackdrop.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  if (!productBackdrop) return;

  productBackdrop.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}

if (productBackdrop && productCloseButton) {
  productCloseButton.addEventListener('click', closeProductModal);

  productBackdrop.addEventListener('click', event => {
    if (event.target === productBackdrop) {
      closeProductModal();
    }
  });
}

if (qtyIncreaseBtn) {
  qtyIncreaseBtn.addEventListener('click', () => {
    quantity += 1;
    updateQuantityUI();
  });
}

if (qtyDecreaseBtn) {
  qtyDecreaseBtn.addEventListener('click', () => {
    if (quantity > 1) {
      quantity -= 1;
      updateQuantityUI();
    }
  });
}

if (productBuyButton) {
  productBuyButton.addEventListener('click', () => {
    if (!currentProduct) return;

    closeProductModal();
    openOrderModal();

    if (orderMessageInput) {
      const total = currentProduct.price * quantity;

      orderMessageInput.value =
        `I'd like to order "${currentProduct.title}" x${quantity} ($${total}).`;
    }
  });
}

/* ===========================
   SHARED: ESCAPE KEY
=========================== */

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;

  if (productBackdrop && productBackdrop.classList.contains('is-open')) {
    closeProductModal();
    return;
  }

  if (orderBackdrop && orderBackdrop.classList.contains('is-open')) {
    closeOrderModal();
  }
});

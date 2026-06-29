const backdrop = document.querySelector('[data-modal]');
const openButtons = document.querySelectorAll('[data-modal-open]');
const closeButton = document.querySelector('[data-modal-close]');

if (backdrop && closeButton && openButtons.length) {
  openButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  closeButton.addEventListener('click', closeModal);

  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && backdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
}

function openModal() {
  backdrop.classList.add('is-open');
  document.body.classList.add('modal-open');
}

function closeModal() {
  backdrop.classList.remove('is-open');
  document.body.classList.remove('modal-open');
}
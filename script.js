const rain = document.getElementById('rain');
const dropCount = 120;
const message = '中秋节快乐';

for (let i = 0; i < dropCount; i += 1) {
  const drop = document.createElement('div');
  drop.className = 'drop';
  drop.textContent = message;

  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 5;
  const delay = -(Math.random() * 13);
  const fontSize = 12 + Math.random() * 18;
  const opacity = 0.45 + Math.random() * 0.55;

  drop.style.left = `${left}%`;
  drop.style.setProperty('--duration', `${duration}s`);
  drop.style.setProperty('--delay', `${delay}s`);
  drop.style.fontSize = `${fontSize}px`;
  drop.style.opacity = opacity;

  rain.appendChild(drop);
}

const decorativeStars = document.querySelector('.stars');
for (let i = 0; i < 36; i += 1) {
  const star = document.createElement('span');
  star.style.position = 'absolute';
  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.width = `${Math.random() * 3 + 2}px`;
  star.style.height = star.style.width;
  star.style.borderRadius = '50%';
  star.style.background = 'rgba(255,255,255,0.9)';
  star.style.boxShadow = '0 0 8px rgba(255,255,255,0.8)';
  star.style.opacity = (Math.random() * 0.7 + 0.3).toString();
  decorativeStars.appendChild(star);
}

const popup = document.getElementById('wishPopup');
const popupMessage = document.getElementById('popupMessage');
const popupClose = document.getElementById('popupClose');
let popupTimer;

function showWish(message) {
  popupMessage.textContent = message;
  popup.classList.add('is-visible');
  popup.setAttribute('aria-hidden', 'false');
  window.clearTimeout(popupTimer);
  popupTimer = window.setTimeout(hideWish, 5200);
}

function hideWish() {
  popup.classList.remove('is-visible');
  popup.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.wish-buttons button').forEach((button) => {
  button.addEventListener('click', () => showWish(button.dataset.message));
});

popupClose.addEventListener('click', hideWish);

const wishButtons = Array.from(document.querySelectorAll('.wish-buttons button'));
const buttonTimers = new Map();

function moveButton(button) {
  const padding = 18;
  const maxLeft = Math.max(padding, window.innerWidth - button.offsetWidth - padding);
  const maxTop = Math.max(padding, window.innerHeight - button.offsetHeight - padding);
  button.style.left = `${padding + Math.random() * (maxLeft - padding)}px`;
  button.style.top = `${padding + Math.random() * (maxTop - padding)}px`;

  const nextMove = 4200 + Math.random() * 3800;
  buttonTimers.set(button, window.setTimeout(() => moveButton(button), nextMove));
}

wishButtons.forEach((button, index) => {
  window.setTimeout(() => moveButton(button), index * 850);
});

window.addEventListener('resize', () => {
  wishButtons.forEach((button) => {
    window.clearTimeout(buttonTimers.get(button));
    moveButton(button);
  });
});

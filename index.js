const slidesData = [
  { credits: 50, price: 5 },
  { credits: 150, price: 15 },
  { credits: 300, price: 30 },
  { credits: 500, price: 50 },
  { credits: 1000, price: 100 },
  { credits: 1500, price: 150 },
];

const createSlide = (data) => {
  return `
        <div class="offer-card">
        <button class="offer-card__buy-button">Buy Now</button>
            <div class="offer-card__content">
                <span class="offer-card__credits">${data.credits}</span>
                <div class="offer-card__badge">
                    <span class="offer-card__badge-text">CR</span>
                </div>
                <span class="offer-card__price-line">/ </span>
                <span class="offer-card__price">$${data.price}</span>
            </div>
            <button class="offer-card__promo">One time offer!</button>
        </div>
`;
};

let swiper;
const swiperWrapper = document.getElementById('swiper-wrapper');
const offersGrid = document.getElementById('offers-grid');

const populateSlides = () => {
  swiperWrapper.innerHTML = '';
  offersGrid.innerHTML = '';

  slidesData.forEach((slide) => {
    if (window.innerWidth < 1024) {
      swiperWrapper.insertAdjacentHTML('beforeend', `<div class="swiper-slide">${createSlide(slide)}</div>`);
    } else {
      offersGrid.insertAdjacentHTML('beforeend', createSlide(slide));
    }
  });
}

const initSwiper = () => {
  populateSlides();

  if (window.innerWidth < 1024 && !swiper) {
    swiper = new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
  } else if (window.innerWidth >= 1024 && swiper) {
    swiper.destroy();
    swiper = null;
  }
}

window.addEventListener('load', initSwiper);
window.addEventListener('resize', initSwiper);


// Функция для обновления таймера
const updateTimer = () => {
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  let time = 600;

  const tick = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    timerHours.textContent = String(hours).padStart(2, '0');
    timerMinutes.textContent = String(minutes).padStart(2, '0');
    timerSeconds.textContent = String(seconds).padStart(2, '0');

    if (time === 0) {
      time = 600;
    } else {
      time--;
    }
  };
  setInterval(tick, 1000);
};

updateTimer();

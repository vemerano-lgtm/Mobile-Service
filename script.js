const faders = document.querySelectorAll('.fade-section');
const serviceCards = document.querySelectorAll('.service-card');

function checkVisible() {
  const windowHeight = window.innerHeight;

  // fade-section
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < windowHeight - 100) el.classList.add('visible');
  });

  // service-card подсветка только для мобильных
  if(window.innerWidth <= 768){
    serviceCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < windowHeight - 50 && rect.bottom > 50) {
        card.classList.add('highlight');
      } else {
        card.classList.remove('highlight');
      }
    });
  } else {
    // на десктопе убираем highlight, hover через CSS
    serviceCards.forEach(card => card.classList.remove('highlight'));
  }
}

window.addEventListener('scroll', checkVisible);
window.addEventListener('load', checkVisible);

// Smooth navigation
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(link.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// Параллакс на карточки для мыши
serviceCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    if(window.innerWidth > 768){
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const offsetX = (x / rect.width - 0.5) * 6;
      const offsetY = (y / rect.height - 0.5) * 6;
      card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translate(0,0)';
  });
});

// Параллакс фон хедера
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  heroBg.style.transform = `translateY(${scrollY * 0.3}px)`; 
});

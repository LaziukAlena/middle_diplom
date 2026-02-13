const servicesSlider = () => {
  const slider = document.querySelector(".services-slider");
  const slides = Array.from(
    document.querySelectorAll(".services-slider .col-md-12"),
  );
  const prevBtn = document.querySelector(".services__arrow--left");
  const nextBtn = document.querySelector(".services__arrow--right");

  let index = 0;

  function getSlidesPerView() {
    return window.innerWidth >= 576 ? 2 : 1;
  }

  function updateSlider() {
    const slidesPerView = getSlidesPerView();
    const slideWidth = slides[0].getBoundingClientRect().width;

    // Плавная анимация
    slider.style.transition = "transform 0.5s ease";
    slider.style.transform = `translateX(-${index * slideWidth}px)`;

    // Блокируем кнопки на границах
    prevBtn.style.opacity = index <= 0 ? "0.3" : "1";
    nextBtn.style.opacity =
      index >= slides.length - slidesPerView ? "0.3" : "1";
  }

  nextBtn.addEventListener("click", () => {
    const slidesPerView = getSlidesPerView();
    if (index < slides.length - slidesPerView) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  window.addEventListener("resize", () => {
    const slidesPerView = getSlidesPerView();
    if (index > slides.length - slidesPerView) {
      index = slides.length - slidesPerView;
      if (index < 0) index = 0;
    }
    updateSlider();
  });

  updateSlider();
};

export default servicesSlider;

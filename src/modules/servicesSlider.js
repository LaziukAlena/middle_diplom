const servicesSlider = () => {
  const slider = document.querySelector(".services-slider");
  if (!slider) return;

  const slides = Array.from(slider.children);
  const prev = document.querySelector(".services__arrow--left");
  const next = document.querySelector(".services__arrow--right");

  let index = 0;

  const getSlidesPerView = () => {
    return window.innerWidth < 576 ? 1 : 2;
  };

  const update = () => {
    const slideWidth = slides[0].offsetWidth;
    const maxIndex = slides.length - getSlidesPerView();

    if (index > maxIndex) index = maxIndex;
    if (index < 0) index = 0;

    slider.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  next.addEventListener("click", () => {
    index++;
    update();
  });

  prev.addEventListener("click", () => {
    index--;
    update();
  });

  window.addEventListener("resize", () => {
    update();
  });

  update();
};

export default servicesSlider;

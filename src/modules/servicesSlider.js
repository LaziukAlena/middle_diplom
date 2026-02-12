const servicesSlider = () => {
  const wrapper = document.querySelector(".services-wrapper");
  const slides = document.querySelectorAll(".services-wrapper > div");
  const prev = document.querySelector(".services__arrow--left");
  const next = document.querySelector(".services__arrow--right");

  if (!wrapper || slides.length === 0) return;

  let index = 0;
  let slidesToShow = window.innerWidth < 576 ? 1 : 2;

  const updateSlidesToShow = () => {
    slidesToShow = window.innerWidth < 576 ? 1 : 2;

    if (index > slides.length - slidesToShow) {
      index = slides.length - slidesToShow;
    }

    moveSlider();
  };

  const moveSlider = () => {
    const translatePercent = 100 / slidesToShow;
    wrapper.style.transform = `translateX(-${index * translatePercent}%)`;
  };

  next.addEventListener("click", () => {
    if (index < slides.length - slidesToShow) {
      index++;
    } else {
      index = 0;
    }
    moveSlider();
  });

  prev.addEventListener("click", () => {
    if (index > 0) {
      index--;
    } else {
      index = slides.length - slidesToShow;
    }
    moveSlider();
  });

  window.addEventListener("resize", updateSlidesToShow);

  updateSlidesToShow();
};

export default servicesSlider;

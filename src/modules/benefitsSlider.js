const benefitsSlider = () => {
  const wrapper = document.querySelector(".benefits-wrap");
  const slides = document.querySelectorAll(".benefits__item");
  const next = document.querySelector(".benefits__arrow--right");
  const prev = document.querySelector(".benefits__arrow--left");

  if (!wrapper || !slides.length) return;

  let index = 0;
  let slidesToShow = 3;

  const getSlidesToShow = () => {
    if (window.innerWidth < 576) {
      slidesToShow = 1;
    } else {
      slidesToShow = 3;
    }
  };

  getSlidesToShow();

  const moveSlider = () => {
    const slideWidth = slides[0].offsetWidth;
    wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
  };

  next?.addEventListener("click", () => {
    if (index < slides.length - slidesToShow) {
      index++;
      moveSlider();
    }
  });

  prev?.addEventListener("click", () => {
    if (index > 0) {
      index--;
      moveSlider();
    }
  });

  window.addEventListener("resize", () => {
    getSlidesToShow();
    if (index > slides.length - slidesToShow) {
      index = slides.length - slidesToShow;
    }
    moveSlider();
  });
};

export default benefitsSlider;

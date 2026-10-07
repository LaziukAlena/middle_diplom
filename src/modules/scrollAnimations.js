// В разметке стоят классы "wow fadeInDown" и data-wow-delay, но библиотеки WOW.js нет,
// поэтому анимации animate.css никогда не запускались. Заменяем на IntersectionObserver.
const scrollAnimations = () => {
  const items = document.querySelectorAll(".wow");
  if (!items.length) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const show = (el) => {
    el.style.visibility = "visible";
  };

  if (!("IntersectionObserver" in window) || reduceMotion) {
    items.forEach(show);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const delay = el.dataset.wowDelay;
        if (delay) el.style.animationDelay = delay;

        show(el);
        el.classList.add("animated");
        observer.unobserve(el);
      });
    },
    { threshold: 0.2 },
  );

  items.forEach((el) => observer.observe(el));
};

export default scrollAnimations;

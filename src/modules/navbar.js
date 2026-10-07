// Bootstrap-JS на странице не подключён, поэтому бургер-меню (data-toggle="collapse")
// и якорные ссылки раньше не работали. Минимальная замена на чистом JS.
const navbar = () => {
  const toggles = document.querySelectorAll(".navbar-toggle");

  const setState = (btn, target, open) => {
    target.classList.toggle("in", open);
    btn.classList.toggle("collapsed", !open);
    btn.setAttribute("aria-expanded", String(open));
  };

  toggles.forEach((btn) => {
    const target = document.querySelector(btn.dataset.target);
    if (!target) return;

    btn.setAttribute("aria-controls", target.id);
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", () => {
      setState(btn, target, !target.classList.contains("in"));
    });
  });

  // Плавная прокрутка к разделам и закрытие мобильного меню после клика
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      if (link.classList.contains("fancyboxModal")) return; // это кнопки модальных окон

      const id = link.getAttribute("href").slice(1);
      const section = id && document.getElementById(id);
      if (!section) return;

      e.preventDefault();
      section.scrollIntoView({ behavior: "smooth" });

      toggles.forEach((btn) => {
        const target = document.querySelector(btn.dataset.target);
        if (target) setState(btn, target, false);
      });
    });
  });
};

export default navbar;

const smoothScroll = () => {
  const btn = document.querySelector(".smooth-scroll");
  const firstSection = document.querySelector("#offer");

  window.addEventListener("scroll", () => {
    if (window.scrollY > firstSection.offsetHeight) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
};

export default smoothScroll;

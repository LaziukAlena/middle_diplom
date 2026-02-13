const smoothScroll = () => {
  const scrollBtn = document.querySelector(".smooth-scroll");
  const firstSection = document.querySelector("#offer");

  if (!scrollBtn || !firstSection) return;

  scrollBtn.style.display = "none";

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", () => {
    const firstSectionHeight = firstSection.offsetHeight;

    if (window.scrollY > firstSectionHeight) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });
};

export default smoothScroll;

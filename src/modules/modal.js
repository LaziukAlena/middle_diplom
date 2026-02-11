const modalModule = () => {
  const overlay = document.querySelector(".overlay");
  const modal = document.querySelector(".header-modal");
  const openButtons = document.querySelectorAll(".fancyboxModal");
  const closeButton = modal.querySelector(".header-modal__close");

  if (!overlay || !modal) return;

  const openModal = (e) => {
    e.preventDefault();
    overlay.style.display = "block";
    modal.style.display = "block";
    modal.classList.add("header-modal--opened");
    overlay.classList.add("active");
  };

  const closeModal = () => {
    overlay.style.display = "none";
    modal.style.display = "none";
    modal.classList.remove("header-modal--opened");
    overlay.classList.remove("active");
  };

  openButtons.forEach((btn) => btn.addEventListener("click", openModal));
  closeButton.addEventListener("click", closeModal);
};

export default modalModule;

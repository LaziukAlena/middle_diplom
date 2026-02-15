const modal = () => {
  const overlay = document.querySelector(".overlay");
  const headerModal = document.querySelector(".header-modal");
  const servicesModal = document.querySelector(".services-modal");

  const openModal = (type) => {
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";

    if (type === "service") {
      servicesModal.style.display = "block";
    } else {
      headerModal.style.display = "block";
    }
  };

  const closeModals = () => {
    overlay.style.display = "none";
    headerModal.style.display = "none";
    servicesModal.style.display = "none";
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".fancyboxModal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (btn.closest(".service-block")) {
        openModal("service");
      } else {
        openModal("header");
      }
    });
  });

  document
    .querySelector(".header-modal__close")
    ?.addEventListener("click", closeModals);

  document
    .querySelector(".services-modal__close")
    ?.addEventListener("click", closeModals);
};

export default modal;

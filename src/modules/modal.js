const modalModule = () => {
  const overlay = document.querySelector(".overlay");

  if (!overlay) return;

  const headerModal = document.querySelector(".header-modal");
  const headerOpenButtons = document.querySelectorAll(".headerModalBtn");
  const headerCloseButton = headerModal?.querySelector(".header-modal__close");

  if (headerModal) {
    const openHeaderModal = (e) => {
      e.preventDefault();
      overlay.style.display = "block";
      headerModal.style.display = "block";
      headerModal.classList.add("header-modal--opened");
      overlay.classList.add("active");
    };

    const closeHeaderModal = () => {
      overlay.style.display = "none";
      headerModal.style.display = "none";
      headerModal.classList.remove("header-modal--opened");
      overlay.classList.remove("active");
    };

    headerOpenButtons.forEach((btn) =>
      btn.addEventListener("click", openHeaderModal),
    );

    headerCloseButton?.addEventListener("click", closeHeaderModal);
  }

  const servicesModal = document.querySelector(".services-modal");
  const servicesOpenButtons = document.querySelectorAll(".fancyboxModal");
  const servicesCloseButton = servicesModal?.querySelector(
    ".services-modal__close",
  );
  const subjectInput = servicesModal?.querySelector('input[name="subject"]');

  if (servicesModal) {
    const openServicesModal = (e) => {
      e.preventDefault();

      const subject = e.currentTarget.dataset.subject;
      if (subject && subjectInput) {
        subjectInput.value = subject;
      }

      overlay.style.display = "block";
      servicesModal.style.display = "block";
      servicesModal.classList.add("services-modal--opened");
      overlay.classList.add("active");
    };

    const closeServicesModal = () => {
      overlay.style.display = "none";
      servicesModal.style.display = "none";
      servicesModal.classList.remove("services-modal--opened");
      overlay.classList.remove("active");
    };

    servicesOpenButtons.forEach((btn) =>
      btn.addEventListener("click", openServicesModal),
    );

    servicesCloseButton?.addEventListener("click", closeServicesModal);
  }
};

export default modalModule;

const certificateModal = () => {
  const certificates = document.querySelectorAll(".sertificate-document");

  if (!certificates.length) return;

  const modal = document.createElement("div");
  modal.classList.add("certificate-modal");

  modal.innerHTML = `
    <div class="certificate-modal__overlay"></div>
    <div class="certificate-modal__content">
      <button class="certificate-modal__close"></button>
      <img class="certificate-modal__image" src="" alt="certificate">
    </div>
  `;

  document.body.append(modal);

  const overlay = modal.querySelector(".certificate-modal__overlay");
  const closeBtn = modal.querySelector(".certificate-modal__close");
  const image = modal.querySelector(".certificate-modal__image");

  const openModal = (src) => {
    image.src = src;
    modal.classList.add("certificate-modal--active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("certificate-modal--active");
    document.body.style.overflow = "";
  };

  certificates.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const src = item.getAttribute("href");
      openModal(src);
    });
  });

  overlay.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
};

export default certificateModal;

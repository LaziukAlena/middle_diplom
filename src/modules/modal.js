const HEADER_VARIANTS = {
  callback: {
    title: "Заказ звонка",
    lead: "Оставьте, пожалуйста, заявку. Мы позвоним Вам в ближайшее время и ответим на все вопросы!",
    button: "Свяжитесь со мной!",
    color: "warning",
  },
  order: {
    title: "Программа «Профремонт»",
    lead: "Оставьте, пожалуйста, заявку и мы свяжемся с Вами, чтобы рассказать детали акции и Вашу скидку!",
    button: "Принять участие!",
    color: "success",
  },
};

let closeAll = () => {};
export const closeModals = () => closeAll();

const setColor = (el, prefix, color) => {
  el.classList.remove(`${prefix}-warning`, `${prefix}-success`);
  el.classList.add(`${prefix}-${color}`);
};

const ensureHidden = (form, name) => {
  let input = form.querySelector(`input[name="${name}"]`);
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.append(input);
  }
  return input;
};

const modal = () => {
  const overlay = document.querySelector(".overlay");
  const headerModal = document.querySelector(".header-modal");
  const servicesModal = document.querySelector(".services-modal");

  if (!overlay || !headerModal || !servicesModal) return;

  let lastFocused = null;

  const clearMessages = (root) => {
    root.querySelectorAll(".form-message").forEach((m) => m.remove());
    root
      .querySelectorAll(".error")
      .forEach((el) => el.classList.remove("error"));
  };

  // Раньше обе кнопки «Узнать свою скидку» и «Заказать звонок» открывали одно и то же окно,
  // а data-subject с названием услуги нигде не использовался.
  const configureHeader = (variant) => {
    const cfg = HEADER_VARIANTS[variant] || HEADER_VARIANTS.callback;
    const title = headerModal.querySelector(".box-modal_topic");
    const lead = headerModal.querySelector(".box-modal_body > p");
    const button = headerModal.querySelector("button[type='submit']");

    title.textContent = cfg.title;
    setColor(title, "text", cfg.color);
    if (lead) lead.textContent = cfg.lead;
    button.textContent = cfg.button;
    setColor(button, "btn", cfg.color);

    ensureHidden(headerModal.querySelector("form"), "subject").value =
      cfg.title;
  };

  const configureServices = (subject) => {
    const title = servicesModal.querySelector(".box-modal_topic");
    title.textContent = subject || "Вызов замерщика";
    ensureHidden(servicesModal.querySelector("form"), "subject").value =
      subject || "";
  };

  const openModal = (box) => {
    lastFocused = document.activeElement;
    clearMessages(box);
    overlay.style.display = "block";
    box.style.display = "block";
    document.body.style.overflow = "hidden";
    box.querySelector("input")?.focus();
  };

  closeAll = () => {
    overlay.style.display = "none";
    headerModal.style.display = "none";
    servicesModal.style.display = "none";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
    lastFocused = null;
  };

  document.querySelectorAll(".fancyboxModal").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      if (btn.closest(".service-block")) {
        configureServices(btn.dataset.subject);
        openModal(servicesModal);
      } else {
        configureHeader(
          btn.getAttribute("href") === "#order" ? "order" : "callback",
        );
        openModal(headerModal);
      }
    });
  });

  [".header-modal__close", ".services-modal__close"].forEach((sel) => {
    const closeBtn = document.querySelector(sel);
    if (!closeBtn) return;
    closeBtn.setAttribute("role", "button");
    closeBtn.setAttribute("tabindex", "0");
    closeBtn.setAttribute("aria-label", "Закрыть");
    closeBtn.addEventListener("click", closeAll);
    closeBtn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        closeAll();
      }
    });
  });

  overlay.addEventListener("click", closeAll);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "block") closeAll();
  });
};

export default modal;

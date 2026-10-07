import { closeModals } from "./modal.js";

// Имя: буквы, пробелы и дефис («Анна-Мария», «Иван Петров»). Раньше пробел не пропускался.
const NAME_RE = /^[A-Za-zА-Яа-яЁё]+(?:[ '-][A-Za-zА-Яа-яЁё]+)*$/;

// Сколько цифр должно быть в номере: код страны + цифры маски (+375 (99) 999-99-99 -> 12)
const expectedDigits = (input) => {
  const mask = input.dataset.mask;
  if (!mask) return null;
  return (
    (mask.match(/^\+(\d+)/)?.[1] ?? "").length + (mask.match(/9/g) || []).length
  );
};

const showMessage = (form, text, type) => {
  let box = form.querySelector(".form-message");
  if (!box) {
    box = document.createElement("div");
    box.setAttribute("role", "status");
    form.append(box);
  }
  box.className = `form-message form-message--${type}`;
  box.textContent = text;
};

const markInvalid = (input, form, text) => {
  input.classList.add("error");
  input.focus();
  showMessage(form, text, "error");
};

const forms = () => {
  document.querySelectorAll("form").forEach((form) => {
    form.noValidate = true;

    form.addEventListener("input", (e) => e.target.classList.remove("error"));

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="fio"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const name = nameInput?.value.trim() ?? "";
      const phone = phoneInput?.value.trim() ?? "";

      if (!name) return markInvalid(nameInput, form, "Введите имя");
      if (!NAME_RE.test(name))
        return markInvalid(
          nameInput,
          form,
          "Имя должно содержать только буквы",
        );
      if (!phone) return markInvalid(phoneInput, form, "Введите телефон");
      const need = expectedDigits(phoneInput);
      const have = phone.replace(/\D/g, "").length;
      if (need ? have !== need : have < 7 || have > 15)
        return markInvalid(
          phoneInput,
          form,
          `Введите номер полностью: ${phoneInput.dataset.mask?.replace(/9/g, "X") ?? ""}`.trim(),
        );

      const data = Object.fromEntries(new FormData(form));
      data.fio = name;

      if (submitBtn) submitBtn.disabled = true;
      showMessage(form, "Отправляем…", "pending");

      try {
        // Демо: jsonplaceholder принимает запрос, но данные не сохраняет.
        // Замените адрес на свой обработчик заявок.
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          },
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        form.reset();
        showMessage(
          form,
          "Спасибо! Заявка отправлена, мы скоро свяжемся с вами.",
          "ok",
        );

        if (form.closest(".header-modal, .services-modal")) {
          setTimeout(closeModals, 1800);
        }
      } catch (err) {
        console.error(err);
        showMessage(
          form,
          "Не удалось отправить заявку. Попробуйте позже.",
          "error",
        );
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  });
};

export default forms;

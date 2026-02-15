const forms = () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector('input[name="fio"]')?.value.trim();
      const phone = form.querySelector('input[name="phone"]')?.value.trim();

      if (!name || !phone) {
        alert("Заполните оба поля");
        return;
      }

      const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;
      const phoneRegex = /^\+?\d{1,16}$/;

      if (!nameRegex.test(name)) {
        alert("Имя должно содержать только буквы");
        return;
      }

      if (!phoneRegex.test(phone)) {
        alert("Телефон должен содержать + и до 16 цифр");
        return;
      }

      const data = Object.fromEntries(new FormData(form));

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).then(() => {
        form.reset();
      });
    });
  });
};

export default forms;

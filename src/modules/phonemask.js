// Маска для полей с data-mask="+7 (999) 999-99-99" (раньше атрибут ничего не делал).
const applyMask = (value, mask) => {
  let digits = value.replace(/\D/g, "");

  // Код страны из маски ("+375 (99)..." -> "375") подставляем сами:
  // "+375 29...", "375 29..." и "8 029..." дают один и тот же результат
  const code = mask.match(/^\+(\d+)/)?.[1];
  if (code) {
    if (digits.startsWith(code)) digits = digits.slice(code.length);
    else if (code === "375" && digits.startsWith("80"))
      digits = digits.slice(2);
  }
  if (!digits) return "";

  let result = "";
  let pending = ""; // «лишние» символы маски добавляем только перед следующей цифрой,
  let i = 0; // иначе Backspace упирается в скобку или пробел

  for (const ch of mask) {
    if (ch === "9") {
      if (i >= digits.length) break;
      result += pending + digits[i++];
      pending = "";
    } else {
      pending += ch;
    }
  }
  return result;
};

const phoneMask = () => {
  document.querySelectorAll("input[data-mask]").forEach((input) => {
    const mask = input.dataset.mask;

    input.setAttribute("inputmode", "tel");
    input.setAttribute("autocomplete", "tel");
    input.setAttribute("maxlength", String(mask.length));

    input.addEventListener("input", () => {
      input.value = applyMask(input.value, mask);
      input.classList.remove("error");
    });

    input.addEventListener("focus", () => {
      if (!input.value) input.value = mask.slice(0, mask.indexOf("9"));
    });

    input.addEventListener("blur", () => {
      const codeLength = (mask.match(/^\+(\d+)/)?.[1] ?? "").length;
      if (input.value.replace(/\D/g, "").length <= codeLength) input.value = "";
    });
  });
};

export default phoneMask;

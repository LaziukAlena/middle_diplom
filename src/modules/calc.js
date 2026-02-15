const calc = () => {
  const calcBlock = document.querySelector("#calc");
  const calcType = document.getElementById("calc-type");
  const calcMaterial = document.getElementById("calc-type-material");
  const calcInput = document.getElementById("calc-input");
  const total = document.getElementById("calc-total");

  if (!calcBlock) return;

  calcInput.addEventListener("input", () => {
    calcInput.value = calcInput.value.replace(/\D/g, "");
    countCalc();
  });

  const countCalc = () => {
    const typeValue = parseFloat(calcType.value) || 0;
    const materialValue = parseFloat(calcMaterial.value) || 0;
    const inputValue = parseFloat(calcInput.value) || 0;

    let totalValue = 0;

    if (typeValue && materialValue && inputValue) {
      totalValue = inputValue * typeValue * materialValue;
    }

    total.value = totalValue;
  };

  calcType.addEventListener("change", countCalc);
  calcMaterial.addEventListener("change", countCalc);
};

document.addEventListener("DOMContentLoaded", () => {
  calc();
});

export default calc;

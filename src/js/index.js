const btns = document.querySelectorAll(".btn");
const display = document.getElementById("display");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnValue = btn.dataset.value;
    let displayValue = display.value;

    if (btnValue === "C") {
      displayValue = "";
    } else if (btnValue === "=") {
      const fixedCount = displayValue.replaceAll("x", "*");
      try {
        displayValue = eval(fixedCount.replace(/\s+/g, "")).toString();
      } catch {
        displayValue = "Error";
      }
    } else if (isOperator(btnValue)) {
      const trimmed = displayValue.trimEnd();
      const tokens = trimmed.split(" ");
      const lastToken = tokens[tokens.length - 1];

      if (isOperator(lastToken)) {
        tokens[tokens.length - 1] = btnValue;
        displayValue = tokens.join(" ") + " ";
      } else {
        displayValue = trimmed + ` ${btnValue} `;
      }
    } else {
      displayValue += btnValue;
      display.scrollLeft = display.scrollWidth;
    }

    display.value = displayValue;
  });
});

function isOperator(char) {
  return ["+", "-", "*", "/", "x"].includes(char);
}

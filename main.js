const legend = document.querySelector("fieldset legend");
const displayExpression = document.querySelector("fieldset p");

const calcBtn = document.querySelectorAll("table tbody tr td button");

let expression = "";

calcBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const btnValue = btn.textContent.trim();

    // clear
    if (btnValue === "AC") {
      displayExpression.textContent = "0";
      expression = "";
      return;
    }

    // delete

    if (btnValue === "CL") {
      expression = expression.slice(0, -1);
      displayExpression.textContent = expression || "0";
      return;
    }

    // equal

    if (btnValue === "=") {
      try {
        const result = Function(`"use strict"; return ${expression}`)();
        displayExpression.textContent = result;
        legend.textContent = expression;
      } catch (err) {
        displayExpression.textContent = "error";
        expression = "";
      }
      return;
    }
    const lastChar = expression.slice(-1);
    const isOp = /[+\-*/]/.test(btnValue);
    const isEx = /[+\-*/]/.test(lastChar);

    if (isOp && isEx) return;
    if (btnValue === "." && /\.\d*$/.test(expression)) {
      return;
    }
    expression += btnValue;
    displayExpression.textContent = expression;
  });
});

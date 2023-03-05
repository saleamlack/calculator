let calculatorInput = {
    firstOperand: null,
    operator: null,
    secondOperand: null,
    currentOperand: null,
}

let calculatorOperations = {
    "+": (firstOperand, secondOperand = 0) => {
        return +firstOperand + +secondOperand;
    },
    "-": (firstOperand, secondOperand) => {
        return firstOperand - secondOperand;
    },
    "*": (firstOperand, secondOperand) => {
        return firstOperand * secondOperand;
    },
    "/": (firstOperand, secondOperand) => {
        if (secondOperand != 0) {
            return firstOperand / secondOperand;
        }
        alert("Error: can't divide to 0");
        clear();
    }
}

const buttons = Array.from(document.querySelectorAll("button"));
buttons.forEach(button => {
    button.addEventListener("click", getTarget);
});

function getTarget(e) {
    if (e.target.className == "number") {
        calculatorInput.currentOperand = storeOperand(e.target.textContent);
        display(calculatorInput.currentOperand);
    } else if (e.target.className == "operator") {
        storeOperator(e.target.textContent);
    } else if (e.target.id == "clear") {
        clear();
    } else if (calculatorInput.currentOperand) {
        del(calculatorInput.currentOperand);
        display(calculatorInput.currentOperand);
    }
}

function display(inputValue) {
    const display = document.querySelector(".display");
    display.textContent = inputValue;
}

function storeOperand(newOperand) {
    if (canConcatenate()) return concatenate(newOperand);
    if (!calculatorInput.firstOperand) {
        return calculatorInput.firstOperand = newOperand;
    } else {
        return calculatorInput.secondOperand = newOperand;
    }
}

function storeOperator(newOperator) {
    canEvaluate() && startEvaluation(calculatorInput.operator);
    if (calculatorInput.firstOperand) {
        calculatorInput.operator = newOperator;
    }
}

function concatenate(newOperand) {
    const noDot = noMoreDot(calculatorInput.currentOperand, newOperand);
    if (calculatorInput.secondOperand) {
        if (noDot) return calculatorInput.secondOperand;
        return calculatorInput.secondOperand += newOperand;
    } else {
        if (noDot) return calculatorInput.firstOperand;
        return calculatorInput.firstOperand += newOperand;
    }
}

function canConcatenate() {
    if (calculatorInput.firstOperand && calculatorInput.secondOperand && calculatorInput.operator) {
        return true;
    } else if (calculatorInput.firstOperand && (!calculatorInput.operator || calculatorInput.operator == "=")) {
        return true;
    }
    return false;
}

function noMoreDot(currentOperand, newOperand) {
    const includesDot = currentOperand.toString().includes(".");
    return (newOperand == ".") && includesDot;
}

function canEvaluate() {
    return Boolean(calculatorInput.secondOperand);
}

function startEvaluation(operator) {
    let result = calculatorOperations[operator](
        calculatorInput.firstOperand,
        calculatorInput.secondOperand);
   resetValues(result);
}

function resetValues(operationResult) {
    calculatorInput.firstOperand = roundDecimals(operationResult);
    calculatorInput.currentOperand = calculatorInput.firstOperand;
    calculatorInput.secondOperand = null;
    display(calculatorInput.currentOperand);
}

function roundDecimals(decimalNumber) {
    calculatorInput.firstOperand = Math.round(decimalNumber * 100) / 100;
    return calculatorInput.firstOperand;
}

function del(currentOperand) {
    const currentOperandArr = currentOperand.toString().split("");
    currentOperandArr.pop();
    const newOperand = currentOperandArr.join("");
    if (currentOperand == calculatorInput.firstOperand) {
        calculatorInput.firstOperand = newOperand;
    } else {
        calculatorInput.secondOperand = newOperand;
    }
    calculatorInput.currentOperand = newOperand;
}

function clear() {
    calculatorInput.firstOperand = null;
    calculatorInput.operator = null;
    calculatorInput.secondOperand = null;
    calculatorInput.currentOperand = null;
    display(calculatorInput.currentOperand);
}
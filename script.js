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
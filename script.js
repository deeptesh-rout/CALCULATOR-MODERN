const display = document.getElementById('display');
const buttons = Array.from(document.querySelectorAll('button'));
let currentInput = '0';
let firstOperand = null;
let operator = null;
let shouldResetDisplay = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('clear')) {
            if (value === 'CE') {
                currentInput = '0';
                display.textContent = currentInput;
            } else {
                currentInput = '0';
                firstOperand = null;
                operator = null;
                display.textContent = currentInput;
            }
            return;
        }

        if (button.classList.contains('operator')) {
            if (value === '⌫') {
                currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
                display.textContent = currentInput;
                return;
            }

            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
            } else if (operator && !shouldResetDisplay) {
                firstOperand = calculate(firstOperand, parseFloat(currentInput), operator);
                display.textContent = firstOperand.toString();
            }

            operator = value;
            shouldResetDisplay = true;
            return;
        }

        if (button.classList.contains('equals')) {
            if (operator && firstOperand !== null) {
                currentInput = calculate(firstOperand, parseFloat(currentInput), operator).toString();
                display.textContent = currentInput;
                firstOperand = null;
                operator = null;
                shouldResetDisplay = true;
            }
            return;
        }

        if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
        }

        if (currentInput === '0' && value === '0') {
            return;
        }

        if (currentInput === '0' && value !== '.') {
            currentInput = '';
        }

        if (value === '.' && currentInput.includes('.')) {
            return;
        }

        currentInput += value;
        
        // Limit the length of the displayed number
        if (currentInput.length > 21) {
            currentInput = currentInput.substring(0, 21);
        }
        
        display.textContent = currentInput;
    });
});

function calculate(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '1/x': return 1 / a;
        case 'x²': return a * a;
        case '√x': return Math.sqrt(a);
        case '%': return a % b;
        default: return b;
    }
}

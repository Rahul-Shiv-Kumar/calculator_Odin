let currentInput = '';
let outputDisplay = document.getElementById('input-output');

function handleButtonClick(event) {
    const buttonValue = event.target.getAttribute('data-operation');

    if (!buttonValue) {
        return; // Do nothing if the clicked element doesn't have data-operation attribute
    }

    switch (buttonValue) {
        case '=':
            calculateResult();
            break;
        case 'clear':
            clearCalculator();
            break;
        case 'backspace':
            backspace();
            break;
        default:
            updateDisplay(buttonValue);
            break;
    }
}

function updateDisplay(value) {
    currentInput += value;
    outputDisplay.textContent = currentInput;
    document.getElementById('display').value = currentInput;
}

function clearCalculator() {
    currentInput = '';
    outputDisplay.textContent = '0';
    document.getElementById('display').value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    outputDisplay.textContent = currentInput || '0';
    document.getElementById('display').value = currentInput;
}

function calculateResult() {
    try {
        const result = eval(currentInput);
        outputDisplay.textContent = result;
        currentInput = result.toString();
    } catch (error) {
        alert("Invalid operation. Please check your input.");
        clearCalculator();
    }
}

// Allow input from keyboard numbers
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault(); // Prevent default behavior for these keys

        if (key === 'Enter') {
            key = '=';
        }

        handleButtonClick({ target: { getAttribute: () => key } }); // Simulate button click
    } else if (key === 'Backspace') {
        event.preventDefault(); // Prevent the default Backspace behavior
        backspace(); // Call the backspace function
    } else if (key === 'Enter') {
        event.preventDefault(); // Prevent the default behavior
        handleButtonClick({ target: { getAttribute: () => '=' } });
    }
});

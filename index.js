// index.js

const display = document.getElementById('d'); // Reference to the display element
let current = '0';         // Current number input or result
let previous = null;       // Stored number before the operator
let operator = null;       // Stored operator (+, −, ×, ÷)
let resetDisplay = false;  // Flag to determine when to reset display

// Update the display with current value
function updateDisplay() {
display.textContent = current;
}

// Handle number and decimal button clicks
function onNumberClick(value) {
if (resetDisplay) {
current = value === '.' ? '0.' : value;
resetDisplay = false;
} else {
if (value === '.' && current.includes('.')) return; // Prevent multiple decimals
current = current === '0' && value !== '.' ? value : current + value;
}
updateDisplay();
}

// Handle operator button clicks
function onOperatorClick(op) {
if (operator && !resetDisplay) {
compute();
}
previous = parseFloat(current);
operator = op;
resetDisplay = true;
}

// Perform the calculation based on current operator
function compute() {
const prev = previous;
const curr = parseFloat(current);

if (operator === '+') current = String(prev + curr);
else if (operator === '−') current = String(prev - curr);
else if (operator === '×') current = String(prev * curr);
else if (operator === '÷') {
current = curr === 0 ? 'Error' : String(prev / curr);
}

updateDisplay();
operator = null;
resetDisplay = true;
}

// Reset all calculator values
function clearAll() {
current = '0';
previous = null;
operator = null;
resetDisplay = false;
updateDisplay();
}

// Delete the last digit in the current value
function deleteLast() {
if (resetDisplay) return;
current = current.length > 1 ? current.slice(0, -1) : '0';
updateDisplay();
}

// Add event listeners to number and decimal buttons
const numButtons = document.querySelectorAll('button.num');
numButtons.forEach(btn => {
btn.addEventListener('click', () => onNumberClick(btn.textContent));
});

// Add event listeners to operator buttons
const opButtons = document.querySelectorAll('button.op');
opButtons.forEach(btn => {
btn.addEventListener('click', () => onOperatorClick(btn.textContent));
});

// Equal button computes the result
document.getElementById('equal').addEventListener('click', () => {
if (operator) compute();
});

// Clear button resets the calculator
document.getElementById('AC').addEventListener('click', clearAll);

// Delete button removes the last digit
document.getElementById('DEL').addEventListener('click', deleteLast);

// Initialize the display
updateDisplay();


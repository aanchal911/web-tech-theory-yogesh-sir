const inputAButton = document.getElementById('inputA');
const inputBButton = document.getElementById('inputB');
const bulb = document.getElementById('bulb');
const gateTypeRadios = document.querySelectorAll('input[name="gateType"]');

let inputAState = 0; // 0 for OFF, 1 for ON
let inputBState = 0; // 0 for OFF, 1 for ON
let currentGateType = 'AND'; // Default gate type

// Function to update the bulb state based on inputs and gate type
function updateBulb() {
    let output = 0;

    if (currentGateType === 'AND') {
        output = inputAState && inputBState; // AND logic
    } else if (currentGateType === 'OR') {
        output = inputAState || inputBState; // OR logic
    }

    if (output === 1) {
        bulb.classList.add('on');
        bulb.classList.remove('off');
    } else {
        bulb.classList.add('off');
        bulb.classList.remove('on');
    }
}

// Function to toggle button state and appearance
function toggleButton(button) {
    const currentState = parseInt(button.dataset.state);
    const newState = 1 - currentState; // Flip the state (0 to 1, 1 to 0)
    button.dataset.state = newState;
    button.textContent = newState === 1 ? 'ON' : 'OFF';
    button.classList.toggle('on', newState === 1); // Add 'on' class if state is 1
    return newState;
}

// Event listener for Input A button
inputAButton.addEventListener('click', () => {
    inputAState = toggleButton(inputAButton);
    updateBulb();
});

// Event listener for Input B button
inputBButton.addEventListener('click', () => {
    inputBState = toggleButton(inputBButton);
    updateBulb();
});

// Event listeners for gate type radio buttons
gateTypeRadios.forEach(radio => {
    radio.addEventListener('change', (event) => {
        currentGateType = event.target.value;
        updateBulb();
    });
});

// Initial bulb state update on load
updateBulb();
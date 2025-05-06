const passwordInput = document.getElementById('pswd');
const messageSpan = document.getElementById('message');
const form = document.getElementById('passwordForm');

// Requirement list items
const lengthReq = document.getElementById('length');
const lowercaseReq = document.getElementById('lowercase');
const uppercaseReq = document.getElementById('uppercase');
const numberReq = document.getElementById('number');
const specialReq = document.getElementById('special');

// Validation functions
const hasLength = (password) => password.length >= 8;
const hasLowercase = (password) => /[a-z]/.test(password);
const hasUppercase = (password) => /[A-Z]/.test(password);
const hasNumber = (password) => /\d/.test(password);
const hasSpecial = (password) => /[!@#$%^&*]/.test(password); // Add more special chars if needed

function validatePassword(password) {
    const validations = {
        length: hasLength(password),
        lowercase: hasLowercase(password),
        uppercase: hasUppercase(password),
        number: hasNumber(password),
        special: hasSpecial(password),
    };

    // Update UI for requirements
    updateRequirementUI(lengthReq, validations.length);
    updateRequirementUI(lowercaseReq, validations.lowercase);
    updateRequirementUI(uppercaseReq, validations.uppercase);
    updateRequirementUI(numberReq, validations.number);
    updateRequirementUI(specialReq, validations.special);

    // Check if all validations pass
    return Object.values(validations).every(isValid => isValid);
}

function updateRequirementUI(element, isValid) {
    if (isValid) {
        element.classList.add('valid');
    } else {
        element.classList.remove('valid');
    }
}

// Event listener for password input
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    validatePassword(password);
    // Clear the main message span while typing
    messageSpan.textContent = '';
    messageSpan.style.color = 'orange'; // Reset color
});

// Event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission
    const password = passwordInput.value;
    const username = document.getElementById('usr').value; // Get username

    if (!username) {
        messageSpan.textContent = 'Username is required.';
        messageSpan.style.color = 'red';
        return; // Stop submission if username is empty
    }


    if (validatePassword(password)) {
        messageSpan.textContent = 'Password is valid!';
        messageSpan.style.color = 'green';
        // Optionally, you could actually submit the form here if needed
        // For example: form.submit();
        // Or send data via AJAX
        console.log('Form submitted (simulated)');
        console.log('Username:', username);
        // console.log('Password:', password); // Avoid logging passwords in real apps
    } else {
        messageSpan.textContent = 'Password does not meet all requirements.';
        messageSpan.style.color = 'red';
    }
});

// Event listener for reset button (optional, good practice)
form.addEventListener('reset', () => {
    // Reset requirement indicators
    updateRequirementUI(lengthReq, false);
    updateRequirementUI(lowercaseReq, false);
    updateRequirementUI(uppercaseReq, false);
    updateRequirementUI(numberReq, false);
    updateRequirementUI(specialReq, false);
    messageSpan.textContent = ''; // Clear message
    messageSpan.style.color = 'orange'; // Reset color
});
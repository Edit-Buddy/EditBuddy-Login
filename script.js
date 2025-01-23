// Define maintenance mode flag
const isMaintenanceMode = false; // Set to true to enable maintenance mode

// Check for maintenance mode on page load
if (isMaintenanceMode) {
    window.location.href = "./common/maintenance.html"; // Redirect to maintenance page
}

// Define static user credentials
const userDatabase = {
    "hlmm": {
        password: "5692",
        securityCode: "2415",
        redirectURL: "https://edit-buddy.github.io/HLMM/" // Custom redirect URL for HLMM
    },
    "jane.smith": {
        password: "abcd",
        securityCode: "efgh",
        redirectURL: "https://example.com/jane-dashboard" // Custom redirect URL for Jane
    }
};

// Select elements
const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");
const feedbackMessage = document.getElementById("feedback-message");

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById("fullname").value.toLowerCase().trim();
    const password = document.getElementById("password").value.trim();
    const securityCode = document.getElementById("security-code").value.trim();

    const btn = document.querySelector('.login-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnSpinner = btn.querySelector('.btn-spinner');

    // Add the "loading" state
    btn.disabled = true;
    btn.classList.add('loading');
    btnText.textContent = 'Connecting';
    btnSpinner.classList.remove('hidden');

    setTimeout(() => {
        // Validate credentials
        if (userDatabase[username] && userDatabase[username].password === password && userDatabase[username].securityCode === securityCode) {
            // Successful login
            feedbackMessage.textContent = 'Login Successful! Redirecting...';
            feedbackMessage.classList.remove('error');
            feedbackMessage.classList.add('success');
            feedbackMessage.style.display = "block";

            setTimeout(() => {
                const redirectURL = userDatabase[username].redirectURL; // Get the custom redirect URL
                window.location.href = redirectURL; // Redirect to the specified URL
            }, 2000);
        } else {
            // Invalid credentials
            errorMessage.textContent = 'Invalid username, password, or security code!';
            errorMessage.style.display = "block";

            // Reset button to original state
            btn.disabled = false;
            btn.classList.remove('loading');
            btnText.textContent = 'Login';
            btnSpinner.classList.add('hidden');
        }
    }, 2000); // Adjust delay as needed
});

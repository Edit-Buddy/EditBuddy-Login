// Define maintenance mode flag
const isMaintenanceMode = false; // Set to true to enable maintenance mode

// Check for maintenance mode on page load
if (isMaintenanceMode) {
    window.location.href = "./common/maintenance.html"; // Redirect to maintenance page
}

// Define static user credentials
const userDatabase = {
    "hlmm": {
        password: "newpass123",
        securityCode: "XYZZ",
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
    }
});

// Button loading animation logic
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const btn = document.querySelector('.login-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnSpinner = btn.querySelector('.btn-spinner');
    const feedbackMessage = document.getElementById('feedback-message');

    // Add the "loading" state
    btn.disabled = true;
    btn.classList.add('loading'); // Add the loading class for white background
    btnText.textContent = 'Connecting'; // Update button text
    btnSpinner.classList.remove('hidden'); // Show spinner

    // Simulate a delay for the fake connection
    setTimeout(() => {
        const isSuccess = Math.random() > 0.5; // Randomly determine success or failure (replace with real validation logic)

        // Reset button to original state
        btn.disabled = false;
        btn.classList.remove('loading'); // Remove the loading class
        btnText.textContent = 'Login'; // Restore button text
        btnSpinner.classList.add('hidden'); // Hide spinner

        // Show appropriate feedback message
        feedbackMessage.classList.remove('hidden'); // Ensure the message is visible
        if (isSuccess) {
            feedbackMessage.textContent = 'Login Successful, Redirecting...';
            feedbackMessage.classList.add('success');
            feedbackMessage.classList.remove('error');

            // Simulate a redirect
            setTimeout(() => {
                feedbackMessage.classList.add('hidden'); // Hide the message
                window.location.href = '/dashboard.html'; // Redirect to dashboard
            }, 2000); // Adjust delay for redirection
        } else {
            feedbackMessage.textContent = 'Login Unsuccessful. Try Again.';
            feedbackMessage.classList.add('error');
            feedbackMessage.classList.remove('success');
        }
    }, 3000); // Adjust delay time as needed
});

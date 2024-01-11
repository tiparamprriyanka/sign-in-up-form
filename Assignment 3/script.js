
function updatePasswordStrength() {
  var password = document.getElementById("signupPassword").value;
  var strength = 0;

  // Check password length
  if (password.length >= 6) {
    strength += 1;
  }

  // Check for letters
  if (/[a-zA-Z]/.test(password)) {
    strength += 1;
  }

  // Check for numbers
  if (/\d/.test(password)) {
    strength += 1;
  }

  // Check for specific symbols
  if (/[$@!%*?&]/.test(password)) {
    strength += 1;
  }

  //  password strength indicator
  var indicator = document.getElementById("passwordStrength");
  switch (strength) {
    case 0:
      indicator.innerHTML = "";
      break;
    case 1:
      indicator.innerHTML = "Weak";
      break;
    case 2:
      indicator.innerHTML = "Moderate";
      break;
    case 3:
      indicator.innerHTML = "Strong";
      break;
    case 4:
    case 5:
      indicator.innerHTML = "Very Strong";
      break;
  }
}


document.getElementById("signupPassword").addEventListener("input", updatePasswordStrength);
document.getElementById("signupConfirmPassword").addEventListener("input", updatePasswordStrength);
document.getElementById("loginPassword").addEventListener("input", updatePasswordStrength);

function togglePasswordVisibility(passwordFieldId) {
  var passwordInput = document.getElementById(passwordFieldId);
  var icon = document.querySelector(`#${passwordFieldId} + .toggle-password i`);

if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordInput.type = "password";
        icon.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

//Function for user signup 
function signup() {
  var username = document.getElementById("signupUsername").value;
  var email = document.getElementById("signupEmail").value;
  var password = document.getElementById("signupPassword").value;
  var confirmPassword = document.getElementById("signupConfirmPassword").value;
  var termsCheckbox = document.getElementById("termsCheckbox");
  var signupMessage = document.getElementById("signupMessage");

  // to clear previous messages
  signupMessage.innerHTML = "";

  // Check if any field is empty
  if (!username || !email || !password || !confirmPassword) {
    signupMessage.innerHTML = "All fields must be filled.";
    return;
  }

  // Terms and Conditions
  if (!termsCheckbox.checked) {
    alert("Please agree to the Terms and Conditions.");
    return;
  }

  // Check password complexity
  if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[$@!%*?&])/.test(password)) {
    signupMessage.innerHTML = "Password should contain at least one letter, one number, and one special symbol.";
    return;
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    signupMessage.innerHTML = "Passwords do not match.";
    return;
  }

  // Retrieve existing users from local storage
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the username or email already exists
  if (existingUsers.some(user => user.username === username || user.email === email)) {
    signupMessage.innerHTML = "Username or email already exists. Please choose a different one.";
    return;
  }

  // Create a new user object
  var newUser = {
    username: username,
    email: email,
    password: password
  };

  // Add the new user to the existing users array
  existingUsers.push(newUser);

  // Save the updated users array back to local storage
  localStorage.setItem("users", JSON.stringify(existingUsers));

  // Show signup success message
  // signupMessage.innerHTML = "User signed up successfully!";

  // Redirect to the login page
  window.location.href = "index.html";
}

// Function for user login
function login() {
  var enteredIdentifier = document.getElementById("signupUsername").value;
  var enteredPassword = document.getElementById("loginPassword").value;

  // Retrieve existing users from local storage
  var existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Check if there are any users with matching username or email and password
  var matchedUser = existingUsers.find(user => (user.username === enteredIdentifier || user.email === enteredIdentifier) && user.password === enteredPassword);

  if (matchedUser) {
    alert("Login successful!");
    window.location.href = "welcome.html";
  } else {
    alert("Invalid username, email, or password. Please try again.");
  }
}







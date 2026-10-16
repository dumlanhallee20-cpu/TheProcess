// AUTH: register, login, and logout.

// Simple email check: text, then @, then text, then a dot, then text
function isValidEmail(email) {
  const atPosition = email.indexOf("@");
  const lastDot = email.lastIndexOf(".");

  if (email.indexOf(" ") !== -1) {
    return false;                 // no spaces allowed
  }
  if (atPosition < 1) {
    return false;                 // needs text before the @
  }
  if (lastDot < atPosition + 2) {
    return false;                 // needs a dot after the @, with text between
  }
  if (lastDot === email.length - 1) {
    return false;                 // needs text after the dot
  }
  return true;
}

// Find a registered user by email. Gives back null if not found.
function findUser(email) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      return users[i];
    }
  }
  return null;
}

// This runs when the user presses "Create account"
function onRegisterSubmit(event) {
  event.preventDefault();

  // 1. Read the form (trim removes extra spaces, toLowerCase makes email lowercase)
  const name = $("#rName").value.trim();
  const email = $("#rEmail").value.trim().toLowerCase();
  const password = $("#rPass").value;
  const confirmPassword = $("#rPass2").value;

  // 2. Check the rules one by one. Stop at the first problem.
  let message = "";
  if (name.length < 2) {
    message = "Enter your full name.";
  } else if (!isValidEmail(email)) {
    message = "Enter a valid email address.";
  } else if (password.length < 8) {
    message = "Password must be at least 8 characters.";
  } else if (password !== confirmPassword) {
    message = "Passwords do not match.";
  } else if (findUser(email) !== null) {
    message = "That email is already registered.";
  }

  $("#eReg").textContent = message;
  if (message !== "") {
    return;
  }

  // 3. Save the new account and log the user in
  users.push({ name: name, email: email, pass: password });
  save("gg_users", users);
  current = email;
  save("gg_current", current);

  // 4. Clear the form and move on
  $("#regForm").reset();
  updateAuth();
  toast("Account created. Welcome, " + name + "!");
  showPage("book");
}

// This runs when the user presses "Login"
function onLoginSubmit(event) {
  event.preventDefault();

  const email = $("#lEmail").value.trim().toLowerCase();
  const password = $("#lPass").value;

  // Find the user and check the password
  const user = findUser(email);
  if (user === null || user.pass !== password) {
    $("#eLogin").textContent = "Wrong email or password.";
    return;
  }

  $("#eLogin").textContent = "";
  current = email;
  save("gg_current", current);

  $("#loginForm").reset();
  updateAuth();
  toast("Welcome back, " + user.name + "!");
  showPage("home");
}

// This runs when the user presses "Logout"
function onLogout() {
  current = null;
  save("gg_current", current);
  updateAuth();
  toast("Logged out.");
  showPage("home");
}

// Show the forms when logged out, or the welcome box when logged in
function updateAuth() {
  let user = null;
  if (current !== null) {
    user = findUser(current);
  }

  if (user === null) {
    $("#authBox").style.display = "grid";
    $("#profileBox").style.display = "none";
    $("#accountBtn").textContent = "Login";
  } else {
    $("#authBox").style.display = "none";
    $("#profileBox").style.display = "block";
    $("#accountBtn").textContent = user.name.split(" ")[0];   // first name only
    $("#profileText").textContent = "Logged in as " + user.name + " (" + user.email + ").";
  }
}

$("#regForm").addEventListener("submit", onRegisterSubmit);
$("#loginForm").addEventListener("submit", onLoginSubmit);
$("#logoutBtn").addEventListener("click", onLogout);
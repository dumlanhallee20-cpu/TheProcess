// HELPERS: small tools used by the other files, and the saved data.

// Find one element on the page. Example: $("#search")
function $(selector) {
  return document.querySelector(selector);
}

// Read saved data from the browser (localStorage).
// If nothing is saved yet, give back the default value.
function load(key, defaultValue) {
  try {
    const text = localStorage.getItem(key);
    if (text === null) {
      return defaultValue;
    }
    return JSON.parse(text);   // turn the saved text back into a list or object
  } catch (error) {
    return defaultValue;
  }
}

// Save data in the browser. JSON.stringify turns the list or object into text.
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // If the browser blocks saving, the page still works until it is closed.
  }
}

// Make text safe before putting it in the page, so users cannot type HTML code.
function esc(text) {
  text = String(text);
  text = text.replace(/&/g, "&amp;");
  text = text.replace(/</g, "&lt;");
  text = text.replace(/>/g, "&gt;");
  text = text.replace(/"/g, "&quot;");
  text = text.replace(/'/g, "&#39;");
  return text;
}

// Show a price like ₱120
function peso(amount) {
  return "₱" + amount.toLocaleString();
}

// Change "13:00" into "1:00 PM"
function fmtTime(time) {
  const parts = time.split(":");
  let hour = Number(parts[0]);
  const minutes = parts[1];
  let ampm = "AM";
  if (hour >= 12) {
    ampm = "PM";
  }
  hour = hour % 12;
  if (hour === 0) {
    hour = 12;
  }
  return hour + ":" + minutes + " " + ampm;
}

// Today's date as text like "2026-10-06"
function today() {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

// Show a small message at the bottom of the screen for 2.5 seconds
let toastTimer = null;
function toast(message) {
  const box = $("#toast");
  box.textContent = message;
  box.style.display = "block";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 2500);
}
function hideToast() {
  $("#toast").style.display = "none";
}

// Find a service or barber by its id. Gives back null if not found.
function findService(id) {
  for (let i = 0; i < services.length; i++) {
    if (services[i].id === Number(id)) {
      return services[i];
    }
  }
  return null;
}
function findBarber(id) {
  for (let i = 0; i < barbers.length; i++) {
    if (barbers[i].id === Number(id)) {
      return barbers[i];
    }
  }
  return null;
}

// SAVED DATA (loaded when the page opens)
let users = load("gg_users", []);          // all registered accounts
let bookings = load("gg_bookings", []);    // all bookings
let current = load("gg_current", null);    // email of the logged-in user (null = nobody)
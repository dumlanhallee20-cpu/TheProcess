// HOME: fill in the numbers on the Home page.

function renderHome() {
  $("#statServices").textContent = services.length;
  $("#statBarbers").textContent = barbers.length;
  $("#statBookings").textContent = bookings.length;
}
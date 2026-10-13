// MY BOOKINGS: show the logged-in user's bookings and let them cancel.

function renderBookings() {
  const box = $("#bookingList");

  // 1. Nobody logged in
  if (current === null) {
    box.innerHTML = '<p class="empty">Please login to see your bookings.</p>';
    return;
  }

  // 2. Collect only this user's bookings
  const mine = [];
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].email === current) {
      mine.push(bookings[i]);
    }
  }

  // 3. No bookings yet
  if (mine.length === 0) {
    box.innerHTML = '<p class="empty">No bookings yet. Tap "Book Now" to make one.</p>';
    return;
  }

  // 4. Sort by date, then time
  mine.sort(function (a, b) {
    return (a.date + a.time).localeCompare(b.date + b.time);
  });

  // 5. Build the table
  let html = '<div class="table-wrap"><table>';
  html += '<tr><th>Date</th><th>Time</th><th>Service</th><th>Barber</th><th>Price</th><th></th></tr>';
  for (let i = 0; i < mine.length; i++) {
    const b = mine[i];
    const service = findService(b.serviceId);
    const barber = findBarber(b.barberId);

    html += "<tr>";
    html += "<td>" + esc(b.date) + "</td>";
    html += "<td>" + fmtTime(b.time) + "</td>";
    html += "<td>" + esc(service.name);
    if (b.notes !== "") {
      html += "<br><small>" + esc(b.notes) + "</small>";
    }
    html += "</td>";
    html += "<td>" + esc(barber.name) + "</td>";
    html += "<td>" + peso(service.price) + "</td>";
    html += '<td><button class="btn small alt" data-cancel="' + b.id + '">Cancel</button></td>';
    html += "</tr>";
  }
  html += "</table></div>";
  box.innerHTML = html;
}

// When a Cancel button is clicked
function onCancelClick(event) {
  const bookingId = event.target.dataset.cancel;
  if (bookingId === undefined) {
    return;   // the click was not on a Cancel button
  }

  // Ask first
  const sure = confirm("Cancel this booking?");
  if (!sure) {
    return;
  }

  // Make a new list without that booking
  const remaining = [];
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].id !== Number(bookingId)) {
      remaining.push(bookings[i]);
    }
  }
  bookings = remaining;
  save("gg_bookings", bookings);

  renderBookings();
  toast("Booking cancelled.");
}

$("#bookingList").addEventListener("click", onCancelClick);
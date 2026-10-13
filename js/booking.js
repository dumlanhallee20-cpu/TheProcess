// BOOKING: the Book Now form, its checks (validation), and the price summary.

// Fill the Service and Barber dropdowns, and block past dates
function fillSelects() {
  let serviceHtml = '<option value="">Select a service</option>';
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    serviceHtml += '<option value="' + s.id + '">' + esc(s.name) + ' – ' + peso(s.price) + '</option>';
  }
  $("#bService").innerHTML = serviceHtml;

  let barberHtml = '<option value="">Select a barber</option>';
  for (let i = 0; i < barbers.length; i++) {
    const b = barbers[i];
    barberHtml += '<option value="' + b.id + '">' + esc(b.name) + '</option>';
  }
  $("#bBarber").innerHTML = barberHtml;

  // The calendar cannot pick a date before today
  $("#bDate").min = today();
}

// Is this barber already booked on this date and time?
function isSlotTaken(barberId, date, time) {
  for (let i = 0; i < bookings.length; i++) {
    const b = bookings[i];
    if (b.barberId === Number(barberId) && b.date === date && b.time === time) {
      return true;
    }
  }
  return false;
}

// Rebuild the Time dropdown. Times that are already booked are disabled.
function refreshTimes() {
  const barberId = $("#bBarber").value;
  const date = $("#bDate").value;
  const oldChoice = $("#bTime").value;   // remember what the user picked

  let html = '<option value="">Select a time</option>';
  for (let i = 0; i < times.length; i++) {
    const time = times[i];
    if (isSlotTaken(barberId, date, time)) {
      html += '<option value="' + time + '" disabled>' + fmtTime(time) + ' (taken)</option>';
    } else {
      html += '<option value="' + time + '">' + fmtTime(time) + '</option>';
    }
  }
  $("#bTime").innerHTML = html;

  // Put the old choice back if it is still free
  if (oldChoice !== "" && !isSlotTaken(barberId, date, oldChoice)) {
    $("#bTime").value = oldChoice;
  }
}

// Show the price of the chosen service in the Summary box
function updateSummary() {
  const service = findService($("#bService").value);

  if (service === null) {
    $("#summary").className = "empty";
    $("#summary").innerHTML = "Choose a service to see the price.";
  } else {
    $("#summary").className = "";
    $("#summary").innerHTML =
      "<p><b>" + esc(service.name) + "</b></p>" +
      "<p>Duration: " + service.mins + " min</p>" +
      '<p>Total: <span class="price">' + peso(service.price) + "</span></p>";
  }
}

// This runs when the user presses "Confirm booking"
function onBookSubmit(event) {
  // Stop the page from reloading
  event.preventDefault();

  // 1. The user must be logged in
  if (current === null) {
    toast("Please login first.");
    showPage("account");
    return;
  }

  // 2. Read the form values
  const serviceId = $("#bService").value;
  const barberId = $("#bBarber").value;
  const date = $("#bDate").value;
  const time = $("#bTime").value;

  // 3. Check each field. Show an error message under any wrong field.
  let hasError = false;

  if (serviceId === "") {
    $("#eService").textContent = "Please choose a service.";
    hasError = true;
  } else {
    $("#eService").textContent = "";
  }

  if (barberId === "") {
    $("#eBarber").textContent = "Please choose a barber.";
    hasError = true;
  } else {
    $("#eBarber").textContent = "";
  }

  let dateError = "";
  if (date === "") {
    dateError = "Please pick a date.";
  } else if (date < today()) {
    dateError = "Date cannot be in the past.";
  } else if (new Date(date + "T00:00").getDay() === 0) {
    dateError = "We are closed on Sundays.";   // getDay() 0 means Sunday
  }
  $("#eDate").textContent = dateError;
  if (dateError !== "") {
    hasError = true;
  }

  if (time === "") {
    $("#eTime").textContent = "Please choose a time.";
    hasError = true;
  } else {
    $("#eTime").textContent = "";
  }

  // 4. If something is wrong, stop here
  if (hasError) {
    return;
  }

  // 5. Check again that the time slot is still free
  if (isSlotTaken(barberId, date, time)) {
    $("#eTime").textContent = "That slot was just taken. Pick another.";
    refreshTimes();
    return;
  }

  // 6. Save the booking
  const newBooking = {
    id: Date.now(),
    email: current,
    serviceId: Number(serviceId),
    barberId: Number(barberId),
    date: date,
    time: time,
    notes: $("#bNotes").value.trim()
  };
  bookings.push(newBooking);
  save("gg_bookings", bookings);

  // 7. Clear the form and show the result
  $("#bookForm").reset();
  updateSummary();
  refreshTimes();
  toast("Booking confirmed!");
  showPage("bookings");
}

// Connect the form and dropdowns to their functions
$("#bBarber").addEventListener("change", refreshTimes);
$("#bDate").addEventListener("change", refreshTimes);
$("#bService").addEventListener("change", updateSummary);
$("#bookForm").addEventListener("submit", onBookSubmit);
// BARBERS: show one card for each barber.

function renderBarbers() {
  let html = "";
  for (let i = 0; i < barbers.length; i++) {
    const b = barbers[i];
    html += '<div class="card">';
    // Show the barber's photo if one is set in data.js, otherwise a gray box
    if (b.photo !== "") {
      html += '<img class="barber-photo" src="' + esc(b.photo) + '" alt="' + esc(b.name) + '">';
    } else {
      html += '<div class="img-slot barber-photo">Barber photo</div>';
    }
    html += '<h3>' + esc(b.name) + '</h3>';
    html += '<p>' + esc(b.spec) + '</p>';
    html += '<button class="btn small" data-barber="' + b.id + '">Choose barber</button>';
    html += '</div>';
  }
  $("#barberList").innerHTML = html;
}

// When "Choose barber" is clicked, select that barber in the booking form
function onBarberClick(event) {
  const barberId = event.target.dataset.barber;
  if (barberId === undefined) {
    return;   // the click was not on a "Choose barber" button
  }
  $("#bBarber").value = barberId;
  refreshTimes();
  showPage("book");
}

$("#barberList").addEventListener("click", onBarberClick);
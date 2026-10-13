// SERVICES: show the service cards with search, category filter, and sorting.

function renderServices() {
  // 1. Read what the user typed or chose
  const searchText = $("#search").value.trim().toLowerCase();
  const category = $("#filterCat").value;
  const sortValue = $("#sortBy").value;

  // 2. Keep only the services that match the search and category
  const matches = [];
  for (let i = 0; i < services.length; i++) {
    const service = services[i];

    let categoryOk = false;
    if (category === "All" || service.cat === category) {
      categoryOk = true;
    }

    let searchOk = false;
    if (service.name.toLowerCase().indexOf(searchText) !== -1) {
      searchOk = true;
    }
    if (service.desc.toLowerCase().indexOf(searchText) !== -1) {
      searchOk = true;
    }

    if (categoryOk && searchOk) {
      matches.push(service);
    }
  }

  // 3. Sort the matches
  if (sortValue === "low") {
    matches.sort(function (a, b) { return a.price - b.price; });
  } else if (sortValue === "high") {
    matches.sort(function (a, b) { return b.price - a.price; });
  } else {
    matches.sort(function (a, b) { return a.name.localeCompare(b.name); });
  }

  // 4. Build one card for each match
  if (matches.length === 0) {
    $("#serviceList").innerHTML = '<p class="empty">No services match your search.</p>';
    return;
  }
  let html = "";
  for (let i = 0; i < matches.length; i++) {
    const s = matches[i];
    html += '<div class="card">';
    html += '<span class="tag">' + esc(s.cat) + '</span>';
    html += '<h3>' + esc(s.name) + '</h3>';
    html += '<p>' + esc(s.desc) + '</p>';
    html += '<p><span class="price">' + peso(s.price) + '</span> · ' + s.mins + ' min</p>';
    html += '<button class="btn small" data-service="' + s.id + '">Book this</button>';
    html += '</div>';
  }
  $("#serviceList").innerHTML = html;
}

// When a "Book this" button is clicked, choose that service in the form
function onServiceClick(event) {
  const serviceId = event.target.dataset.service;
  if (serviceId === undefined) {
    return;   // the click was not on a "Book this" button
  }
  $("#bService").value = serviceId;
  updateSummary();
  showPage("book");
}

// Run renderServices every time the user types or changes a dropdown
$("#search").addEventListener("input", renderServices);
$("#filterCat").addEventListener("change", renderServices);
$("#sortBy").addEventListener("change", renderServices);

// One listener for the whole list (event delegation)
$("#serviceList").addEventListener("click", onServiceClick);
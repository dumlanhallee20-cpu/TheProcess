// PAGES: show one section at a time and handle the menu buttons.

// Show the page with this id and hide the others.
function showPage(pageId) {
  // 1. Show or hide each section
  const pages = document.querySelectorAll(".page");
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].id === pageId) {
      pages[i].classList.add("active");
    } else {
      pages[i].classList.remove("active");
    }
  }

  // 2. Highlight the matching menu button
  const buttons = document.querySelectorAll("#nav button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].dataset.page === pageId) {
      buttons[i].classList.add("active");
    } else {
      buttons[i].classList.remove("active");
    }
  }

  // 3. Refresh the content of the page we are opening
  if (pageId === "home") {
    renderHome();
  }
  if (pageId === "bookings") {
    renderBookings();
  }
  if (pageId === "book") {
    refreshTimes();
  }

  // 4. Go back to the top of the screen
  window.scrollTo(0, 0);
}

// When a menu button is clicked, open its page
function onMenuClick(event) {
  showPage(event.currentTarget.dataset.page);
}

// When a button with data-go is clicked (like "Book a haircut"), open that page
function onGoClick(event) {
  showPage(event.currentTarget.dataset.go);
}

const menuButtons = document.querySelectorAll("#nav button");
for (let i = 0; i < menuButtons.length; i++) {
  menuButtons[i].addEventListener("click", onMenuClick);
}

const goButtons = document.querySelectorAll("[data-go]");
for (let i = 0; i < goButtons.length; i++) {
  goButtons[i].addEventListener("click", onGoClick);
}
// MAIN: runs everything when the page opens. Keep this file LAST in index.html.

fillSelects();     // fill the dropdowns in the booking form
renderServices();  // draw the service cards
renderBarbers();   // draw the barber cards
refreshTimes();    // fill the time dropdown
updateAuth();      // show Login or the user's name
showPage("home");  // start on the Home page
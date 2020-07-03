"use strict";

/*
 * This is the scripts.js file for ryanfleck.ca
 *
 * It contains methods for checking the browser storage to apply
 * user preferences to the css, and controlling the settings modal.
 *
 */

var d =
  "M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z";

window.addEventListener("load", function (event) {
  // console.log("Hello World!");

  var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headers.forEach(function (header) {
    if (!header.classList.contains("page-title")) {
      // Create the elements.
      var anchorLink = document.createElement("a");

      // Add required attributes.
      anchorLink.text = "~";
      anchorLink.href = "#" + header.id;
      anchorLink.className = "header-anchor-link";
      anchorLink.style.float = "left";
      anchorLink.style.marginLeft = "-20px";

      // Append to header.
      header.appendChild(anchorLink);
    }
  });
});

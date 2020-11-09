"use strict";

/*
 * This is the scripts.js file for ryanfleck.ca
 *
 * It contains methods for checking the browser storage to apply
 * user preferences to the css, and controlling the settings modal.
 *
 */

window.addEventListener("load", function (event) {
  //Feature 1: Add tildes with anchor links beside all headers.
  var headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headers.forEach(function (header) {
    if (!header.classList.contains("page-title")) {
      if (header.id) {
        // Create the elements.
        var anchorLink = document.createElement("a");

        // Add required attributes.
        anchorLink.text = "~"; // Could be pilcrow ¶
        anchorLink.href = "#" + header.id;
        anchorLink.className = "header-anchor-link";
        anchorLink.style.float = "left";
        anchorLink.style.marginLeft = "-20px";

        // Append to header.
        header.appendChild(anchorLink);
      }
    }

    // Feature 2: Let RCF Services know we're here.
    fetch("https://rcf-services.herokuapp.com/", { mode: "cors" })
      .then((res) => {
        // For now, just print the response.
        console.log("Services responded with:");
        console.log(res);
      })
      .catch((e) => {
        // This feature is still in development, so no worries if errors occur.
        console.error("Couldn't contact services.");
        console.error(e);
      });
  });
  /*
  // Feature 2: Replace Xg and Xgs with explanation.
  var paragraphs = document.getElementsByTagName("p");
  for (let x = 0; x < paragraphs.length; x++) {
    var para = paragraphs[x];
    para.innerHTML = para.innerHTML.replace("Xg", "ykh");
    para.innerHTML = para.innerHTML.replace("Xgs", "ykhs");
  }
  */
});

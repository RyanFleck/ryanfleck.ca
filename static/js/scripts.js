"use strict";

/*
 * This is the scripts.js file for ryanfleck.ca
 *
 * It contains methods for checking the browser storage to apply
 * user preferences to the css, and controlling the settings modal.
 *
 */

function setPageViews(message) {
  console.log("This page has " + message + " views.");
  var count = document.getElementById("views");
  var box = document.getElementById("views-box");
  count.innerText = message;
  box.classList.remove("invisible");
  box.classList.add("visible");
}

/*
 * On load operations.
 */

window.addEventListener("load", function (event) {
  console.log("Page scripts for ryanfleck.ca loaded and running.");

  // Check session storage and page URL
  var id = sessionStorage.getItem("rcf_user_id") || "";
  var url = window.location.href.toString();
  var server = "https://rcf-services.herokuapp.com";

  // If running in development, point requests to localhost:8000
  if (url.indexOf("localhost") == 7) {
    console.log("Contacting local Django server instead of production.");
    server = "http://localhost:8000";
  }

  //Feature 1: Add tildes with anchor links beside all headers.
  console.log("Feature 1: Add tildes with anchor links beside all headers.");
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
  });

  // Feature 2: Attempt to contact rcf-services on Heroku.
  var postData = {
    user_id: id,
    page_url: url,
  };

  console.log("Feature 2: Attempt to contact rcf-services on Heroku.");
  fetch(server + "/api/view-counts/page-tracker/", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(postData),
  })
    .then((res) => {
      // For now, just print the response.
      return res.json();
    })
    .then((blob) => {
      console.log(blob);

      // Save an ID if it is provided.
      if (blob.hasOwnProperty("new_id")) {
        console.log("Got new ID from server. Saving...");
        sessionStorage.setItem("rcf_user_id", blob.new_id);
      }

      // Set the page views if they are given by the server.
      if (blob.hasOwnProperty("page_views")) {
        setPageViews(blob.page_views.toString());
      }
    })
    .catch((e) => {
      // This feature is still in development, so no worries if errors occur.
      console.error("Couldn't contact services.");
      console.error(e);
    });
});

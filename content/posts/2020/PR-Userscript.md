---
date: 2020-08-05T09:23:51-04:00
title: "Userscripts"
draft: false
tags:
  - Programming
  - Userscripts
  - JavaScript
---

Had my first foray into the wonderful world of userscripts today.

After pushing the _Show More_ button on a Github pull request one too many times,
knowing about userscripts, I decided to install TamperMonkey and get to work.

Here's the script I wrote to click the _Show More_ button until all comments were
visible and could be properly audited:

<script src="https://gist.github.com/RyanFleck/601f73a96a9f78193ccbd61db33d510c.js"></script>

To date, this script has saved me a lot of time, and I have written a few others in the meantime,
mostly for use on Github.

<!--

Here is a copy of the linked script in case GitHub fails.

```js
// ==UserScript==
// @name         PR ExpandR
// @namespace    http://ryanfleck.ca/
// @version      1.0
// @description  Expand all GitHub PR conversations.
// @author       Ryan Fleck
// @match        https://github.com/*/pull/*
// ==/UserScript==

var interval = 3000;

function expand_convos(){
    var buttons = document.getElementsByTagName('button');
    for(let i=0; i<buttons.length; i++){
        if(buttons[i].textContent.trim().includes("hidden")){
            window.setTimeout(function(){
                console.log("Clicking button to expand: [ "+buttons[i].textContent.trim()+" ].");
                buttons[i].click();
            }, 400);
        }
    }
    window.setTimeout(expand_convos, interval);
}

(function() {
    'use strict';
    console.log("PR Detected, searching for hidden items every "+(interval/1000)+" seconds.");
    expand_convos();
})();
```

-->

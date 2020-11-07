---
date: 2020-08-05T09:23:51-04:00
title: "PR Userscript"
draft: true
tags:
- Programming
- Userscripts
- JavaScript
---

Had my first foray into the wonderful world of userscripts today.

<script src="https://gist.github.com/RyanFleck/601f73a96a9f78193ccbd61db33d510c.js"></script>

Saved me a lot of time.

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

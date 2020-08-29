---
tags:
date: 2020-08-29T09:07:13-06:00
title: "How To Survive ITI 1120: Programming Basics In Python"
draft: true
toc: true
---

<div style="position: fixed; bottom:0; right: 0;">
<button onclick="forward()" class="slideshow-button">
Next Slide
</button>
</div>

<div style="position: fixed; bottom:0; left: 0;">
<button onclick="back()" class="slideshow-button">
Previous Slide
</button>
</div>

<div id="interactive-warning">

# Interactive Presentation

This page is an interactive slideshow.

Press this button to disable the scripting magick.

<button onclick="disableMagic()" id="slideshow-enabler" class="slideshow-button">
Disable The Slideshow Magicks
</button>

</div>

<div class="slideshow-section">

# Why You Are Here

Welcome to my "`ITI1120: Introduction to Computing I`" bootcamp.

You are here (good on you for taking initiative,) because you want a head
start in `ITI1120`, which will be a bird course if you understand the
content of this presentation.

This is not a python lecture, it is a programming lecture.

</div>

<div class="slideshow-section">

# Why You Ought To Listen To Me

Primary Reasons:

1. I am currently a professional python developer at _Wise Assistant_
1. I have probably written a little more python code than you
1. I am at least three times as engaging as the average prof

Other cool things that I am:

1. A lead developer on our electric car team
1. IEEE uOttawa WEBMASTER Executive
1. Get paid to work from a hammock
</div>

<div class="slideshow-section">

# Presentation Content

1. Types
1.

</div>
<div class="slideshow-section">

# Section 2 Heading

Yada

Yada

Yada

Yada

Yada

Yada

</div>
<div class="slideshow-section">

# Section 3 Heading

Yada

Yada

Yada

Yada

Yada

Yada

</div>
<div class="slideshow-section">

# Section 4 Heading

Yada

Yada

Yada

Yada

Yada

Yada

</div>
<div class="slideshow-section">

# Section 5 Heading

Yada

Yada

Yada

Yada

Yada

Yada

</div>
<div class="slideshow-section">

# Resources

Here are a few of the things I read to create this presentation

1. The Python Book
1. This [finding if an element is in the viewport](https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/) in vanilla js

</div>

<!-- SLIDESHOW MAGICKS, BEWAERE YE WHO ENTER THIS REALME OF JAVASCRIPTES -->

<script>
var magic = true
var advance
var retreat
var sections 

function getSlideInViewport(){
  var winHeight = (window.innerHeight || document.documentElement.clientHeight);
  console.log("Properties for window: Height "+winHeight+"px");

  console.log(sections[0].getBoundingClientRect().top);
  if(sections[0].getBoundingClientRect().top > 20) return -1;

  for(let x=0; x < sections.length; x++){
    console.log("Properties for section "+x);
    var bounds = sections[x].getBoundingClientRect()
    console.log(bounds);
    if(bounds.top >=(-100)){return x;}
  }

}
function forward(){
  console.log("Moving forward...");
  var current = getSlideInViewport();
  console.log("Element "+current+" of type "+(typeof current)+" is in the viewport");
  if(typeof current == "number"){
    var next = current + 1;
    if(next < sections.length){
      console.log("Scrolling to "+next);
      var elem = sections[next];
      elem.scrollIntoView();
    }
  }else{
    alert("Move over a slide to enable buttons, space, arrow keys.");
  }
}

function back(){
  console.log("Moving backwards...");
  var current = getSlideInViewport();
  console.log("Element "+current+" of type "+(typeof current)+" is in the viewport");
  if(typeof current == "number"){
    var next = current - 1;
    if(next >= 0){
      console.log("Scrolling to "+next);
      var elem = sections[next];
      elem.scrollIntoView();
    }
  }else{
    alert("Move over a slide to enable buttons");
  }
}

function disableMagic(){
    var btn = document.getElementById("slideshow-enabler");
    var warning = document.getElementById("interactive-warning");
    btn.remove();
    warning.remove();
    var elems = sections.length;
    for(var x=0; x < elems; x++){
        sections[0].classList.remove("slideshow-section");
    }
    var buttons = document.getElementsByClassName("slideshow-button");
    var btncnt = buttons.length;
    for(var x=0; x < btncnt; x++){
        buttons[0].remove();
    }
    window.scrollTo(0,0);
    document.body.onkeydown = null;

}


window.addEventListener('load', function(event){
    console.log("DOM loaded, getting sections...");
    sections = document.getElementsByClassName("slideshow-section");
    console.log("There are "+sections.length+" slides in this slideshow.");


    document.body.onkeydown = function(event){

        // Spacebar was pressed.
        if(event.keyCode == 32){
            event.preventDefault();
            forward();
        }

        // Left arrow key.
        if(event.keyCode == 37){
            event.preventDefault();
            back();
        }
        
        // Right arrow key.
        if(event.keyCode == 39){
            event.preventDefault();
            forward();
        }
    }


});

</script>

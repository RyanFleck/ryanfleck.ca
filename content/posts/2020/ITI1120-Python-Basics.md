---
tags:
date: 2020-08-29T09:07:13-06:00
title: "How To Survive ITI 1120"
draft: true
toc: true
---

<script>
var magic = true
var advance
var retreat
var sections 

function getSlideInViewport(){
  var winHeight = (window.innerHeight || document.documentElement.clientHeight);
  console.log("Properties for window: Height "+winHeight+"px");

  for(let x=0; x < sections.length; x++){
    console.log("Properties for section "+x);
    var bounds = sections[x].getBoundingClientRect()
    console.log(bounds);
    if(
        bounds.top >=(-200) &&
        bounds.bottom <= winHeight+200
    ){
        return x;
    }
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

This page is an interactive slideshow. Press this button to disable the magic.

<button onclick="disableMagic()" id="slideshow-enabler" class="slideshow-button">
Disable The Slideshow Magicks
</button>

</div>



<div class="slideshow-section">

# Section 0 Heading 

Yada

Yada

Yada

Yada

Yada

Yada


</div>
<div class="slideshow-section">

# Section 1 Heading 

Yada

Yada

Yada

Yada

Yada

Yada


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

# Section 6 Heading 

Yada

Yada

Yada

Yada

Yada

Yada


</div>

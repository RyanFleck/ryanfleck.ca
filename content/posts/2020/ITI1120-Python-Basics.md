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

# Welcome To

<h1 style="font-size:3.2rem; padding: 0; margin: 0;">HOW TO PROGRAM</h1>

An introduction to programming and Python for `ITI1120` students

</div>

<div class="slideshow-section">

# Why You Are Here

Welcome to my "`ITI1120: Introduction to Computing I`" bootcamp.

You are here (_good on you for taking initiative,_) because you want a head
start in `ITI1120`, which will be a bird course if you understand the
content of this presentation.

You can read the slides afterwards at [ryanfleck.ca](https://ryanfleck.ca)

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

1. What even is programming?
1. The object-oriented paradigm (type) of programming
1. Practical python for completing assignments

</div>

<div class="slideshow-section">

# Section 1

<h1 style="font-size:3rem; padding: 0; margin: 0;">WHAT IS THIS SH*T!?</h1>

An introduction to the beautiful world of computer programming

_CPU = Computer Processing Unit = Processor_

</div>

<div class="slideshow-section">

# Function and Abstraction

In the time it takes for light to move 6cm through space, a processor will have enough time to complete the execution of a single instruction.

With **assembly languages**, we can tell a CPU to compute a single instruction.

_Calculation: 5GHz CPU at 1 IPC, light-speed = 299792458 m/s_

</div>

<div class="slideshow-section">

# Function and Abstraction

But **assembly languages** allow extremely precise control of all parts of a CPU.

_Control so fine_ that you can dictate every minute step of your program.

We don't always need that, and in most cases this would be _extremely impractical,_
so we write langages to _abstract this functionality_.

That's fancy talk for "we write things that mean a bunch of other things."

Allow me to demonstrate...

</div>

<div class="slideshow-section">

# Hello World in Assembler

```asm
extrn MessageBoxA: PROC
extrn ExitProcess: PROC

.data
title db 'Win64', 0
msg db 'Hello, World!', 0

.code
main proc
  sub rsp, 28h
  mov rcx, 0
  lea rdx, msg
  lea r8,  title
  mov r9d, 0
  call MessageBoxA
  add rsp, 28h
  mov ecx, eax
  call ExitProcess
main endp

End
```

</div>

I didn't feel like dragging out my computer architecture textbook, so I ripped this from _SO_.
Source: <https://stackoverflow.com/questions/1023593/how-to-write-hello-world-in-assembler-under-windows>

<div class="slideshow-section">

# Hello World in C

```c
#include <stdio.h>

int main(void) {
   printf("Hello, World!");
   return 0;
}
```

</div>

<div class="slideshow-section">

# Hello World in Python

```py
print("Hello, World!")
```

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

1. The Python Textbook from 2015
1. This [finding if an element is in the viewport](https://gomakethings.com/how-to-test-if-an-element-is-in-the-viewport-with-vanilla-javascript/) in vanilla js thread

</div>

<!-- SLIDESHOW MAGICKS, BEWAERE YE WHO ENTER THIS REALME OF JAVASCRIPTES -->

<script>
var magic = true
var advance
var retreat
var sections 

function getSlideInViewport(){
  var winHeight = (window.innerHeight || document.documentElement.clientHeight);
  if(sections[0].getBoundingClientRect().top > 20) return -1;

  for(let x=0; x < sections.length; x++){
    var bounds = sections[x].getBoundingClientRect()
    if(bounds.top >=(-100)){return x;}
  }

}
function forward(){
  var current = getSlideInViewport();
  if(typeof current == "number"){
    var next = current + 1;
    if(next < sections.length){
      var elem = sections[next];
      elem.scrollIntoView();
    }
  }else{
    alert("Move over a slide to enable buttons, space, arrow keys.");
  }
}

function back(){
  var current = getSlideInViewport();
  if(typeof current == "number"){
    var next = current - 1;
    if(next >= 0){
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
    sections = document.getElementsByClassName("slideshow-section");


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

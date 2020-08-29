---
tags:
date: 2020-08-29T09:07:13-06:00
title: "How To Survive ITI 1120: Programming Basics In Python"
toc: true
---

<div id="interactive-warning">

# Preamble

**Hit space now** if you'd like to skip all this garbage and start the slideshow.

It should be noted that this public copy is a draft, here it is in big red letters so people
notice and refrain from sending me emails about incomplete content on my website. I know already. I'm working on it.

<h1 style="color: red; font-size: 5rem; padding: 0; margin: 0; text-decoration: none;">
DRAFT!
</h1>

Whille keeping this in mind, enjoy!

## Interactive Presentation

This page is an _interactive slideshow_ that can be controlled with space, the arrow
keys, and the spacebar. **Hit space now** to advance to the first slide.

Press this button to disable the scripting magick.

<button
onclick="disableMagic()"
id="slideshow-enabler"
class="slideshow-button"
style="color:red; background: black; width: 100%; height: 3rem;">
Disable The Slideshow Magicks
</button>

</div>

<div class="slideshow-section">

# Welcome To

<h1 style="font-size:3.2rem; padding: 0; margin: 0;">HOW TO PROGRAM</h1>
<p style="padding: 0; margin: 0">
An Introduction to Programming and Python for ITI1120 Students
</p>
<p style="font-size: 0.7rem; color: #AAA; padding: 0; margin: 0">
CC BY-SA 4.0 Ryan Fleck 2020
</p>

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

**Primary Reasons:**

1. I am currently a professional python developer at _Wise Assistant_
1. I have probably written a little more python code than you
1. I am at least three times as engaging as the average prof

**Other cool things that I am:**

1. A lead developer on our electric car team
1. IEEE uOttawa WEBMASTER Executive
1. paid to work from a hammock
</div>

<div class="slideshow-section">

# Presentation Content

1. [What even is programming?](#section-1)
1. [The object-oriented paradigm (type) of programming](#section-2)
1. [Practical python for completing assignments](#section-3)

</div>

<div class="slideshow-section">

# Section 1

<h1 style="font-size:3.4rem; padding: 0; margin: 0;">WHAT IS THIS SH*T!?</h1>

An introduction to the beautiful world of computer programming

_CPU = Computer Processing Unit = Processor_

</div>

<div class="slideshow-section">

# Computers Are Fast

In the time it takes for light to move 6cm through space, a processor will have enough time to complete the execution of a single instruction.

With **assembly languages**, we can tell a CPU to compute a single instruction.

_Calculation: 5GHz CPU at 1 IPC, light-speed = 299792458 m/s_

</div>

<div class="slideshow-section">

# Abstractions

But **assembly languages** allow extremely precise control of all parts of a CPU.

_Control so fine_ that you can dictate every minute step of your program.

We don't always need that, and in most cases this would be _extremely impractical,_
so we write langages to _abstract this functionality_.

That's fancy talk for "we write things that mean a bunch of other things."

Allow me to demonstrate...

</div>

<div class="slideshow-section">

# Hello World in Assembler

This program will be assembled into bytecode.

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

This program will be _compiled_ to **assembly**.

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

This program will be _interpreted_ with code written in **C**

[^1]: I know it's not exactly like this.

```py
print("Hello, World!")
```

</div>

<div class="slideshow-section">

# Higher Abstractions and 4GLs

We can use languages that abide by _logical_, _functional_, or even better/stranger
paradigms to truly **free our thinking from the bounds of computer hardware.**

A great paper on all the paradigms can be found [here](https://www.info.ucl.ac.be/~pvr/VanRoyChapter.pdf), titled
_Programming Paradigms for Dummies: What Every Programmer Should Know_ by _Peter Van Roy._

Graphical languages called **4GLs** (fourth generation languages) have been proposed
but always die because they become messy with complexity.

</div>

<div class="slideshow-section">

# Programming Is...

Embedding your own mind and personality into machines.

</div>

<div class="slideshow-section">

# Section 2

<h1 style="font-size:7rem; padding: 0; margin: 0;">OBJECTS</h1>

The things that we use to think in the object-oriented paradigm

_AKA OOP pronounced Oh-Oh-Pee, I kid you not_

</div>

<div class="slideshow-section">

# Section 3

<h1 style="font-size:4rem; padding: 0; margin: 0;">Practical Python</h1>

It's easy to write, easy to make mistakes with, and easy to enjoy

_Guido van Rossum is the BDFL (Benevolent Dictator for Life) of Python_

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

<div style="position: fixed; bottom:0; right: 0; opacity: 50%;">
<button onclick="forward()" class="slideshow-button">
Next
</button>
</div>

<div style="position: fixed; bottom:0; left: 0; opacity: 50%;">
<button onclick="back()" class="slideshow-button">
Previous
</button>
</div>

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
keys, vim keys, and the spacebar. **Hit space or j now** to advance to the first slide.

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

# Introduction

<h1 style="font-size:3.2rem; padding: 0; margin: 0;">HOW TO PROGRAM</h1>
<p style="padding: 0; margin: 0">
An Introduction to Programming and Python for ITI1120 Students
</p>
<p style="font-size: 0.7rem; color: #AAA; padding: 0; margin: 0">
CC BY-SA 4.0 Ryan Fleck 2020
</p>

</div>

<div class="slideshow-section">

## Why You Are Here

Welcome to my "`ITI1120: Introduction to Computing I`" bootcamp.

You are here (_good on you for taking initiative,_) because you want a head
start in `ITI1120`, which will be a bird course if you understand the
content of this presentation.

You can read the slides afterwards at [ryanfleck.ca](https://ryanfleck.ca)

</div>

<div class="slideshow-section">

## Why You Ought To Listen To Me

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

## Presentation Content

1. [What even is programming?](#section-1)
1. [The basics of programming in Python](#section-2)
1. [The object-oriented paradigm (type) of programming](#section-3)
1. [Practical python for completing assignments](#section-4)

</div>

<div class="slideshow-section">

# Section 1

<h1 style="font-size:3.4rem; padding: 0; margin: 0;">HELLO COMPUTER</h1>

An introduction to the beautiful world of computer programming

_CPU = Computer Processing Unit = Processor_

</div>

<div class="slideshow-section">

## Computers Are Fast

In the time it takes for light to move 6cm through space, a processor will have enough time to complete the execution of a single instruction.

With **assembly languages**, we can tell a CPU to compute a single instruction.

_Calculation: 5GHz CPU at 1 IPC, light-speed = 299792458 m/s_

</div>

<div class="slideshow-section">

## Abstractions

But **assembly languages** allow extremely precise control of all parts of a CPU.

_Control so fine_ that you can dictate every minute step of your program.

We don't always need that, and in most cases this would be _extremely impractical,_
so we write langages to _abstract this functionality_.

That's fancy talk for "we write things that mean a bunch of other things."

Allow me to demonstrate...

</div>

<div class="slideshow-section">

## Hello World in Assembler

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

## Hello World in C

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

## Hello World in Python

This program will be _interpreted_ with code written in **C**

[^1]: I know it's not exactly like this.

```py
print("Hello, World!")
```

</div>

<div class="slideshow-section">

## Higher Abstractions and 4GLs

We can use languages that abide by _logical_, _functional_, or even better/stranger
paradigms to truly **free our thinking from the bounds of computer hardware.**

A great paper on all the paradigms can be found [here](https://www.info.ucl.ac.be/~pvr/VanRoyChapter.pdf), titled
_Programming Paradigms for Dummies: What Every Programmer Should Know_ by _Peter Van Roy._

Graphical languages called **4GLs** (fourth generation languages) have been proposed
but always die because they become messy with complexity.

</div>

<div class="slideshow-section">

## Programming Is...

Embedding your own mind and personality into machines.

</div>

<div class="slideshow-section">

# Section 2

<h1 style="font-size:7rem; padding: 0; margin: 0;">Python</h1>

There is divine beauty and strength in simplicity.

</div>

<div class="slideshow-section">

## Why You Are Learning This

- To pass the class
- You can get paid to program in Python
- Genuine interest and curiosity

</div>

<div class="slideshow-section">

## Setting Up A Development Environment

I recommend following along past this point in a jupyter notebook. It's very easy to create a new one in _Google Colab_ AKA _Collaboratory_.

Far easier, at least, than setting up python for each of you:

<a href="https://colab.research.google.com/#create=true" target="_blank">colab.research.google.com/#create=true</a>

![google colab notebook](/pics/py/colab.png)

</div>

<div class="slideshow-section">

## The Canonical First Program

<br />

```py
print("Hello, World!")
```

<br />

</div>

<div class="slideshow-section">

## Dealing with Variables and Data

We can express a number of different data types in Python. Here, we assign a
few different things to variables with different names.

```py
# Integers
total = 9001

# Strings
name = "Ryan"

# Floating Points
angle = 192.3289

```

You don't need to worry about the types when you create the variables; Python does that for you.

</div>

<div class="slideshow-section">

# Section 3

<h1 style="font-size:7rem; padding: 0; margin: 0;">OBJECTS</h1>

The things that we use to think in the object-oriented paradigm

_AKA OOP pronounced Oh-Oh-Pee, I kid you not_

</div>

<div class="slideshow-section">

## Why You Are Learning This

Python (And Java in `ITI1121`) are object-oriented languages.

This means that they are languages with functionality built around _creating and manipulating objects_ to solve problems.

So, what are objects?

</div>

<div class="slideshow-section">

## A Simple Object

**Imagine a duck.**

Ducks have many **attributes**, or properties:

```
  weight, height, name
```

Ducks also have many **functions**, or things that it can do:

```
  walk, quack, fly, attack, drink
```

</div>

<div class="slideshow-section">

## Objects Store Attributes and Functions

All of these attributes and functions are stored within an object.

Objects hold groups of related attributes and functions.

</div>

<div class="slideshow-section">

## Simple Object Example

Don't worry about the syntax for now. **This isn't real python.**
What matters is that we can group attributes and functions
into useful collections that we organize in objects.

```py
object Duck
  weight = 10    # attributes
  height = 30
  name = "Dave"

  def quack():
    print(f"Hello, I am a Duck named {self.name}")

  def attack(enemy_duck):
    print(f"QUAAACK! PREPARE TO DIE {enemy_duck}!")

```

See here, a simple way to store everything we need to know about a duck and
how it works!

</div>

<div class="slideshow-section">

<br />

Given the above, we can now use the `Duck` like so:

```py
print(Duck.name)
# prints Dave

print(Duck.height)
# prints 30

Duck.quack()
# prints Hello, I am a Duck named Dave

Duck.attack(JimTheDuck)
# prints QUAAACK! PREPARE TO DIE JIM!
```

</div>

<div class="slideshow-section">

## Recap on Objects: Encapsulation

They **encapsulate** (hold) stuff:

1. They have attributes
1. They have functions

...so, how do we make objects? By using **Classes**.

</div>

<div class="slideshow-section">

## Classes are Templates for Objects

We can define the attributes and behaviour for many objects by writing a class.
**This is real Python,** but don't worry about the syntax yet.

All you need to know here is that `__init__` is called when you are creating
a new `Duck`, and `self` represents the object that the class is referring to.

```python
class Duck:
    def __init__(self, name, height, weight):
        self.name = name
        self.height = height
        self.weight = weight

    def quack(self):
        print("QUACK!")

    def greet(self):
        print(f"Hello, my name is {self.name}")

howard = Duck("Howard", 10, 10)
howard.quack()  # QUACK!
howard.greet()  # Hello, my name is Howard
```

I know that this is a complicated example, but I promise I'll touch on all of
this syntax, bit by bit, later in the presentation.

</div>

<div class="slideshow-section">

## Weighing Ducks

Now, we programmers know that we can create as many duck objects as we want.

How can we use these ducks?

</div>

<div class="slideshow-section">

## Section

Yada

</div>

<div class="slideshow-section">

# Section 4

<h1 style="font-size:4rem; padding: 0; margin: 0;">Practical Python</h1>

It's easy to write, easy to make mistakes with, and easy to enjoy

_Guido van Rossum is the BDFL (Benevolent Dictator for Life) of Python_

</div>

<div class="slideshow-section">

## Section

Yada

</div>

<div class="slideshow-section">

## Section

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
var sections
var space = 32;
var left = 37;
var right = 39;
var j = 74;
var k = 75;

function getSlideInViewport(){
  var winHeight = (window.innerHeight || document.documentElement.clientHeight);
  if(sections[0].getBoundingClientRect().top > 20) return -1;

  for(let x=0; x < sections.length; x++){
    var bounds = sections[x].getBoundingClientRect()
    if(bounds.top >=(-(winHeight/2))){return x;}
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

        var key = event.keyCode;

        // Spacebar was pressed.
        if(key == space){
            event.preventDefault();
            forward();
        }

        // Left arrow key or K.
        if(key == left || key == k){
            event.preventDefault();
            back();
        }

        // Right arrow key or J.
        if(key == right || key == j){
            event.preventDefault();
            forward();
        }
    }

    // Debug slide height/detection value
    // window.setInterval(function(){console.log(getSlideInViewport());},500);


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
```

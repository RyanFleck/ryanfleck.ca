---
date: 2019-12-07T10:36:16-05:00
title: "Programming the HCS12 CPU in C"
draft: true
toc: true
tags:
  - Programming
  - C
---

# Introduction

The second half of CEG3136 instructs students on the usage of peripherals like
displays, input switches, buzzers, and thermistors using the C programming
language in an embedded context.

The specific CPU used in the course is a Freescale MC9S12DG256B, embedded in a
[Dragon12-Plus2](http://www.evbplus.com/dragon12_plus2_9s12_hcs12/dragon12_plus2_9s12_hcs12.html)
training board.

If you are unfamiliar with C, here is a quick rundown of the basics.
Note that some parts of the language below work specifically with compilers for
the HC12/HCS12 and will not work in regular C programs. A header file, which includes
a set of macros and definitions for the HCS12 CPU, enables programmers to easily
write to registers and common memory addresses.

```c
// Comments can be like this
/* Comments can also be like this */

// Import your libraries at the top of the file:
#inlcude <stdio.h>

// Include any headers so the file can be correctly linked:
#include "mc9s12dg256.h"
#include "theHeaderFile.h"

// Define constants and macros
#define DELAY 20000
#define min(x, y) ((x)<(y) ? (x):(y))

// Define global variables here.
int a;
int b;
char gt;

// Declare functions
int increment_by_three(int * x);

// A c program should have a main function somewhere.
int main(void){

  // Assignment
  a = 2;
  b = 4;

  // If-elseif-else
  if( a > b ){
    gt = 'A';
  }else if(b > a){
    gt = 'B';
  }else{
    gt = 'X';
  }

  // While-do
  while( a != 0 ){
    a--;
  }

  // The mc9s12 header allows us to set registers
  DDRB = 0xFF

  // We can use bitwise operators to turn bits:
  // on:
  TIOS |= BIT1;
  // or off:
  TIOS &= ~BIT1;

  // Run an assembly command:
  asm cli;

  // Calling a function:
  increment_by_three(b);
}

// A function definition:
int increment_by_three(int * x){
  *x = *x + 3;
  return *x;
}
```

...that's all the C you need to know to complete CEG3136.

# The Dragonboard

![](/pics/dragon12.jpg)
_Picture used (permission pending) from EVBplus.com_

Laboratories enabled students to attain embedded development experience on the
Dragon12 board.

# Utilizing a 7-Segment Display

_Based on the content of CEG3136 Lab 3_

# Utilizing a Hitachi LCD

_Based on the content of CEG3136 Lab 3_

# Using Interrupts

_Based on the content of CEG3136 Lab 4_

# Analog to Digital Conversion

_Based on the content of CEG3136 Lab 5_

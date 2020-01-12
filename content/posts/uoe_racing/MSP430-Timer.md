---
tags:
date: 2020-01-11T18:27:35-05:00
title: "MSP430 Timer Module"
draft: true
toc: true
---

# MSP430F5529LP?

Texas Instruments' Launchpad Microcontrollers are used in UOE Racing's
electric car projects. UOE's entry for the [Shell Eco-Marathon](https://www.shell.com/make-the-future/shell-ecomarathon.html) competition relies
on an MSP430 Launchpad board to control a DRV8323, which controls a
brushless DC (BLDC) motor. As part of a small team, I am responsible for
improving the code to control the DRV8323, and by extension, the BLDC.

A timer, the CPU peripheral that ticks down to zero then interrupts the CPU,
is a very practical tool for embedded development. This is a short guide,
written with the intent of being a self-reference, on how to configure the
timer within the `MSP430F5529` MCU.

![MSP430F5529LP Pinout for Energia](/pics/compressed/msp430.jpeg)

<p style="text-align:center"><i>MSP430F5529LP pinout</i></p>

When working with TI Launchpad boards, either the *Energia* or *Code Composer
Studio* (CCS) IDEs can be used. Energia, an adapted Arduino IDE, is easier
for beginners, but lacks the advanced debugging capabilities of CCS. I will
be working with both in this document, so please be aware as not all code
will run in both environments.

Regardless of the environment, you'll need the correct headers at the top of
your C file or Energia script in order to poke registers and configure
peripherals within the MSP430:

```c
#include "msp430f5529.h"
```

The primary reference for this article is TI's thousand-page
[tome](http://www.ti.com/lit/ug/slau208q/slau208q.pdf)[^tome] with everything
you'd ever need to know about the microcontroller.

[^tome]: TI MSP430x5xx Family User's Guide, Revision Q, [www.ti.com/lit/ug/slau208q/slau208q.pdf](http://www.ti.com/lit/ug/slau208q/slau208q.pdf), Copyright &copy; 2008-2018 Texas Instruments Incorporated 


# The Timer_A Peripheral

`Timer_A` is a timer (who would have guessed?) module with seven capture/compare
registers, `CCR0` through to `CCR6`. The MCU also has `B` and `D` timers, but
I suppose I'll look into those when I run out of channels on `Timer_A`. Below is
the block diagram from page 462 of TI's user guide[^tome].

![](/pics/timer/block.png)

The takeaways from the diagram above should be:
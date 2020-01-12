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
on an MSP430 Launchpad board to control a DRV8323, which in turn controls a
brushless DC (BLDC) motor.

A timer, the CPU peripheral that ticks down to zero then interrupts the CPU,
is a very practical tool for embedded development. This is a short guide on
how to configure the timer within the `MSP430F5529` MCU.

![MSP430F5529LP Pinout for Energia](/pics/compressed/msp430.jpeg)

<p style="text-align:center"><i>MSP430F5529LP pinout</i></p>

When working with TI Launchpad boards, either the *Energia* or *Code Composer
Studio* (CCS) IDEs can be used. Energia, an adapted Arduino IDE, is easier for
beginners, but lacks the advanced debugging capabilities of CCS. I will be
working with both in this document, so please be aware as not all code will run
in both environments.

# Test
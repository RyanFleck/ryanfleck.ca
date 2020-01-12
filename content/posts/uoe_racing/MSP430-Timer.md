---
tags:
date: 2020-01-11T18:27:35-05:00
title: "MSP430 Timer Module"
toc: true
---

# MSP430F5529LP?

*Work in progress.*

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
I suppose I'll look into those when I run out of channels on `Timer_A0` (there
are two other `Timer_A` modules on the board!) This timer module
is **16 bits** and has **up to** six channels.

Below is the block diagram from page 462 of TI's user guide[^tome].

![](/pics/timer/block.png)

By reading the manual and the diagram above, we know:

1. Each of the seven timer channels has a control register `TAxCCTLn`.
1. The timer is controlled with the `TAxCTL` register (p.476)[^tome].
    1. Bits 9 and 8 control `TASSEL`, which should usually be set to `10` to
       read from the `SMCLK`, the sub-main clock.
    1. Bits 7 and 6 control `ID`, the *prescaler*, which divides the input clock
       by 2 to the power of (the value of `ID`).
    1. Bit 2 controls `TACLR`, which if set to 1, clears the module.
    1. Bit 1 controls `TAIE`, which enables the `TAIFG` interrupt when the timer
       overflows.
    1. Bit 0 controls `TAIFG`, which is set to 1 when there is an interrupt
       pending.

1. Each channel is controlled by a `TAxCCTLn` register.
    1. Bit 4 is `CCIE`, enabling interrupts.

# A Practical Example

The only registers we need to configure `Timer_A` are `TA0CTL`, and for each
timer channel, `TA0CCTLn` and `TA0CCRn`. The register `TA0R` stores the actual
value of the timer. For example, a simple blink program in C would look like the
following:

(Compiled with CCS, 2020-01-12, on an MSP430F5529LP)


```c
#include "msp430f5529.h"

/**
 * Timer experiments.
 * Adapted by Ryan Fleck - Ryan.Fleck@protonmail.com
 *
 * Blinks LED2 at P4.7 @ 2Hz
 * 
 * 2^16 = 65536
 * ~1MHz clock /8 = 125000 Hz
 * * 65536 ticks = 1.9 Hz blinks
 * Approximately half-second blinks
 */

void main(void)
{

    // Stop watch-dog timer
    WDTCTL = WDTPW | WDTHOLD;

    // Set the seventh bit of the P4 Data Direction Register to HIGH
    // This allows us to use P4.7 LED as an OUTPUT.
    P4DIR |= BIT7;
    P4OUT &= ~BIT7; // Turns LED off.

    // Configure Timer A0.
    TA0CTL = TASSEL_2 + MC_2 + TACLR;
    // From TI example ta0_02:
    // - SMCLK set as clock.
    // - MC - mode control - timer counts up to FFFF and resets.
    // - Clears TAR, previous count, clock divider.
    TA0CTL |= BIT7 + BIT6;
    // - Sets prescaler to 8.

    // Configure Timer A0 Channel 0:
    //TA0CCR0 = 0xFFFF;

    // For counting, we want output-compare mode.

    // Configure Timer A0 Channel 1:
    TA0CCTL1 = CCIE;
    TA0CCR1 = 0xFFFF;

    TA0CCTL2 = CCIE;
    TA0CCR2 = 0xFFFA;

    // Enable all interrupts.
    __bis_SR_register(GIE);

    while (1)
        ;
}

/* TimerA has two interrupt vectors:
 *  - One dedicated to CCR0
 *  - One shared by TAIFG, plus all other channels.
 */

#pragma vector=TIMER0_A0_VECTOR
__interrupt void TIMER0_A0_ISR(void)
{
    // Handle CCR0 interrupts.
}

#pragma vector=TIMER0_A1_VECTOR
__interrupt void TIMER0_A1_ISR(void)
{
    P1OUT ^= 0x01;                            // Toggle P1.0
    switch (__even_in_range(TA0IV, TA0IV_TAIFG))
    {
    case TA0IV_NONE:
        break;
    case TA0IV_TACCR1:
        P4OUT ^= BIT7; // Toggle the LED bit.
        break;
    case TA0IV_TACCR2:
        break;
    case TA0IV_TACCR3:
        break;
    case TA0IV_TACCR4:
        break;
    default:
        __never_executed();
    }
}


```

One silly thing to note: when looking at your timer modules in CCS, you'll
notice you have many, named with the convention `TimerX_AY`. Here, `X` denotes
the timer module, and `Y` denotes the number of channels[^slides].

`__even_in_range()` allows the compiler to generate more efficient code for the
switch, equivalent to switch(TA0IV)[^even_ir]

[^even_ir]: TI Forums: "What does the '__even_in_range' function do?" [e2e.ti.com/support/microcontrollers/msp430...](https://e2e.ti.com/support/microcontrollers/msp430/f/166/t/557522?What-does-the-even-in-range-function-do-)

[^slides]: TI MSP430x5xx Timer Training, [software-dl.ti.com/trainingTTO/trainingTTO_public_sw/MSP430_LaunchPad_Workshop/v4/Chapters/MSP430m06_TIMERS.pdf](http://software-dl.ti.com/trainingTTO/trainingTTO_public_sw/MSP430_LaunchPad_Workshop/v4/Chapters/MSP430m06_TIMERS.pdf), Copyright &copy; 2008-2018 Texas Instruments Incorporated 


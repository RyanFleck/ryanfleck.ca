---
tags:
date: 2019-10-13T10:30:49-04:00
title: "Notes on VHDL"
toc: true
---

# Preamble

*VHDL* stands for *Very High Speed Integrated Circuit Hardware Design Language*.
No, I'm not kidding. Despite being a mouthful, the language is used
by engineers to prototype and describe industrial digital logic.

This document is a copy of living notes for the *CEG3155* course I am currently
taking, *Digital Systems II*.

# A Basic VHDL Program

Let's dive right in with a full example. Here is an implementation for a decoder
with an enable bit. Note the two primary sections of the program: entity, and
architecture.

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity decoder_enable is
  port(
    a, b, en : in std_logic_vector;
    d : out std_logic_vector(3 downto 0)
  );
end decoder_enable;

architecture de_arch of decoder_enable is
begin
  d <= "0000" when (en="0") else
       "0001" when (not(a or b)) else
       "0010" when ((not a) and b) else
       "0100" when (a and (not b)) else
       "1000" when (a and b);
end de_arch;
```
The first thing that our program requires is the standard IEEE 1164 libraries.
These should always be present at the top of your programs to use constructs
like `std_logic_vector`.

```vhdl
library ieee;
use ieee.std_logic_1164.all;
```
After importing libraries, we describe our entity by providing the inputs and
outputs. Here, `a`, `b`, and `en` are of type `std_logic`, a simple binary
operator that can hold `0` or `1`. Our output is a `std_logic_vector`, which is
an array of `std_logic` objects. The notation `3 downto 0` will create four
output bits.

```vhdl
entity decoder_enable is
  port(
    a, b, en : in std_logic;
    d : out std_logic_vector(3 downto 0)
  );
end decoder_enable;
```

After describing our entity, we describe the internals of the entity with an
*architecture* block. The output `d` is written to with the arrow operator `<=`,
and using `when` and `else` statements. The first condition that is true will be
written to the output `d`.

```vhdl
architecture de_arch of decoder_enable is
begin
  d <= "0000" when (en="0") else
       "0001" when (not(a or b)) else
       "0010" when ((not a) and b) else
       "0100" when (a and (not b)) else
       "1000" when (a and b);
end de_arch;
```

<!--This pattern is called *conditional signal assignment statement.*-->









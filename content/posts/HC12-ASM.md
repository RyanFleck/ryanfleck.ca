---
tags: ASM, Assembly, HC12
date: 2019-10-09T13:24:10-04:00
title: "Introduction to HC12 Assembly"
---

The **HC12** CPU is used to teach the **CEG3136** class at the University of
Ottawa. This document is a *living personal reference* to the CPU12 CISC
instruction set. *WIP!* 

Let's get started with a few practical examples.

# Using the Stack

The stack is an area of memory that we can place temporary variables in. It is
good for functions or subroutines that need to manipulate more data than can be
stored in the registers. First, we call the `OFFSET 0` command to define a set
of offset labels. Essentially, these labels allow data structures and variables
to be reserved and accessed in the stack.

```asm
  OFFSET 0
space_to_store_x   DS.W 1
space_for_one_word DS.W 1
a_ten_byte_space   DS.B 10

store_something:
  PSHX
  LDD #$1234
  STAB space_for_one_word,SP
```

# Reading the Docs

When looking at documentation, you'll need to know how to read the function
inputs.

All operations will use the following notation for **operands**:

Expression | Referenced Data Type
-----------|----------------------
`opr8i`, `opr16i` | 8-bit or 16-bit **i**mmediately addressed data
`opr8a`, `opr16a` | 8-bit or 16-bit **a**ddress
`oprx5`, `oprx9`, `oprx16` | N-bit const offset for indexed addressing
`oprx3` | 3 bit increment or decrement value
`xysp` | The X, Y, SP or PC registers
`xys` | The X, Y or SP registers
`abd` | The A, B, or D registers
`rel8`, `rel9`, `rel16` | N-Bit offset from PC for relative addressing
`oprx0_xysp` | Can be a variety of address inputs, shown below

`oprx0_xysp` functions can be given:

- `oprx3, xys` with `xys` pre or post incremented or decremented, like `+X` or
  `Y-`.
- `oprx5, xysp` which is indexed offset.
- `abd, xysp`, the X, Y, or Z registers offset by A, B, or D.



**Great,** now you can read the docs like a *master!* NXP has quite a few
publicly available documents with the instruction set thoroughly detailed, like
[this
one](https://www.nxp.com/assets/documents/data/en/reference-manuals/S12XCPUV1.pdf).

# Addressing Modes

In short, the modes available on the HC12 CPU are:

1. Immediate, where the data is included in the instruction.
1. Direct, where an address in memory is given.
1. Indexed, where 
1. Relative

Each of these can be expanded to include their operating modes (`N` is
substituted here for instructions that can be all of the bit-modes indicated in
the table above, and `op` for operation):

1. Immediate: `op #oprNi`
1. Direct: `op opr8a`
  - Extended: `op opr16a`
1. Indexed
1. Relative

# Formatting Tests

The below are to ensure correct syntax highlighting.

## Assembly

```asm
  OFFSET 0
  DS.W 1
  MYINT DS.W 1

loopTo3k:
  PSHX
  LDX MYINT,SP 

```

## C

This snippet...
```c
#include <stdio.h>

void main(void) {

  short print(char *str) {
    
    while (*str != '\0') {
      printf("%x -> %c\n", str, *str);
      str++;
    }

  }

  // xyz is a pointer to the first character.
  char xyz[6] = {'h', 'e', 'l', 'l', 'o', '\0'};

  print(xyz);
}
```
...will return the following (address will vary):
```
83f76a4a -> h
83f76a4b -> e
83f76a4c -> l
83f76a4d -> l
83f76a4e -> o
```

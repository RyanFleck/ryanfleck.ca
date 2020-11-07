---
tags: ASM, Assembly, HC12
date: 2019-10-09T13:24:10-04:00
title: "Notes on HC12 Assembly"
toc: true
tags:
- Programming
- Assembly 
---

# Introduction

The **HC12** CPU is used to teach the **CEG3136** class at the University of
Ottawa. This document is a *living personal reference* to the CPU12 CISC
instruction set. *WIP!* 

Let's get started with a practical example. Calculate:

```
z = a + b - c
```

A function written in **C**:
```c
void addstuff() {
  int z;
  int a=5, b=6, c=8;
  z = a + b - c;
}
```

Now in **HC12 ASM**, using *sections* for organization:
```tasm
consts: SECTION
var_a DC.W 5
var_b DC.W 6
var_c DC.W 8

data:   SECTION
z DS.W 1

code:   SECTION
addstuff:
  LDAA var_a
  ADDA var_b
  SUBA var_c
  STAA z
  RTS
``` 


# Reading the Docs

When looking at documentation, you'll need to know how to read the operands for
any given function. Learning this will enable you to *feed* any given function
the data it needs to run, and prevent you and the machine from *diverging in your
thinking!*

Most manuals will use the following notation for **operands**:

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


# Using the Stack

The stack is an area of memory that we can place temporary variables in. It is
good for functions or subroutines that need to manipulate more data than can be
stored in the registers. First, we call the `OFFSET 0` command to define a set
of offset labels. Essentially, these labels allow data structures and variables
to be reserved and accessed in the stack. See the [Program
Organization](#program-organization) section for more information on `OFFSET`.

```tasm
  OFFSET 0
space_to_store_x   DS.W 1
space_for_one_word DS.W 1
a_ten_byte_space   DS.B 10

store_something:
  PSHX
  LDD #$1234
  STAB space_for_one_word,SP
```

As you can see, `variable_name, SP` is used to reference areas of the stack
memory. Here is a more complex example, where a subroutine preserves the
registers before completing a set of operations:

```tasm
; create_array.asm
; =========================================
;  Creates an array of one-byte decimals like so in the memory:
;   [ 3, 4, 5, 6, 7, 8 ]
;  at the address given in register Y.

  OFFSET 0
DS.W 1      ; Space to RTS address 
DS.B 1      ; Space to store A
DS.B 1      ; Space to store B

create_array:
  PSHA  ; Save A to the stack
  PSHB  ; Save B to the stack

  ; Load 3 into the A register.
  LDAA #$3
  LDAB #$5

; Description below.
loop:
  STAA 0,Y
  INY
  INCA
  DECB
  BNE loop
  
  PULB  ; Restore B to previous status
  PULA  ; Restore A to previous status
  RTS
```

Let's look carefully at the instructions in the loop.

1. `STAA 0,X` stores the contents of the register A into the memory address
referenced in the register X. For the first run of the loop, the value 3 is
loaded into the memory address `[X]`.
1. Now that we are done with the X register for now, we can point it to the next
address in memory with the `INX` command.
1. To ensure we'll store `4` in the next address, we `INCA`. The `A` register is
*incremented* and now contains the number `4`.
1. `DECB` is called and `B` becomes `4`. It will continue to be decremented
until it becomes zero, and the `BNE` command *refrains* from jumping back to the
`loop` label.
1. `BNE` is *branch if not equal to zero*, checking the CCR (Condition Code
Registers) to see if the last operation set the `Z` (zero) bit. If the zero bit
is **not** set, `BNE` will move the `PC` back to the argument label, in this
case, `loop`.

**Notably,** we use `PSHA` and `PSHB` at the beginning of the *subroutine* to
save the current contents of the `A` and `B` registers to the stack. At the end
of the program, we use `PULB` and `PULA` to move the original contents of the
registers back into place.

We do this in order to reduce the impact of the subroutine on the running
machine code. Subroutines are responsible for cleaning up after themselves. If a
subroutine messed up the registers in the middle of a long operation which made
a subroutine call, that long operation would be *very unhappy!*

# Addressing Modes

In short, the modes available on the HC12 CPU are:

1. Immediate
1. Direct
1. Indexed
1. Relative

Each of these can be expanded to include their operating modes (`N` is
substituted here for instructions that can be all of the bit-modes indicated in
the table above, and `op` for operation):

1. Immediate: `op #oprNi`
1. Direct: `op opr8a`
  - Extended: `op opr16a`
1. Indexed:
  - With N-Bit offset: `op oprxN,xysp`
  - With 3-Bit offset, pre-decrement: `op oprxN,-xysp`
  - With 3-Bit offset, pre-increment: `op oprxN,+xysp`
  - With 3-Bit offset, post-decrement: `op oprxN,xysp-`
  - With 3-Bit offset, post-increment: `op oprxN,xysp+`
  - With accumulator offset: `op abd,xysp`
  - Indexed-Indirect, 16-bit offset: `[oprx16, xysp]`
  - Indexed-Indirect, D offset: `[D, xysp]`
1. Relative: `op PCr, oprxN`

These can be broken into three loose operating modes, with modifiers:

1. **Directly providing the value,** using the `#` character, directly gives the CPU the
value in the instruction. There is no RAM access needed to proceed with the
operation.
2. **Using an offset,** supplying two values without an addition or subtraction
symbol (`like,this`), adds the two numbers together and allows the CPU to access 
things like the stack.
3. **Incrementing or decrementing**, supplying a `+` or `-` before or after the
`xysp` allows the `xysp` register to be increased or decreased before or after
the contents of the address are passed back to wherever the operation dictates.

Some examples might be nice:

```tasm
; Inherent instructions have NO addressing mode.
inherent:
  NOP
  LSL

immediate:
  ; Note the #!
  LDAA #$64
  LDX #$1234
  BEQ inherent

direct:
  LDS

indexed_offset:
  


direct:
  LDS #AFE ; Init stack pointer.
```

# Program Organization 

A number of labels and directives can be used to sort the pieces of a program,
ensuring they are placed in (or forced into,) the correct place in memory. Here
are the commands *to know* for the midterm.

**ORG** is the *origin* command. It places assembly code at the specified
location in memory. Generates an internal, absolute code **section** in memory.

```tasm
; Next instruction will be placed at address 3000
  ORG $3000
```

**OFFSET** declares an *offset* section which is useful for stack frames or
simulating data structures. Essentially, this allows you to pre-allocate blocks
of memory *around the stack pointer* for use for a particular purpose. The
command we use the most, `OFFSET 0`, tells the compiler to, *starting at the
stack pointer, preserve this much space for this set of variables.* Order does
matter: If you are going to *push* or *pull* anything to the stack, you need to
reserve space for those at the 'bottom', and define those *first*.

**SECTION** declares a *relocatable* section. These can include data, constant
data, or code. Define *separate sections* so these are placed in the correct
memory location. Variables defined with *DS* (define storage,) constants defined
with *DC*, and code all belong in different places.

```tasm
consts: SECTION
const1: DC.B $8B
const2: DC.B $A4

data:   SECTION
var1:   DS.W 1
var2:   DS.W 1

code:   SECTION
loop:
  LDAA const1
  ADDA const2
  STAA var1
  BRA loop
```

**SWITCH** blocks assemble code according to *case* statements. After assembly,
the switch block no longer exists; only one of the cases is preserved in the
final `.s19` file.

```tasm
var EQU 5

; Written directive:
SWITCH var
CASE 0
  LDD #23
CASE 2
  LDD #89
CASE 5
  LDD #A8
DEFAULT
  LDD #19
ENDSW

; Generates:
  LDD #A8
```

<br />
<hr />
<br />

**Formatting Tests**

The below are to ensure correct syntax highlighting.

A bit of assembly:

```tasm
  OFFSET 0
  DS.W 1
  MYINT DS.W 1

loopTo3k:
  PSHX
  LDX MYINT,SP 

```
Here's a short C snippet I wrote while playing with strings.

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

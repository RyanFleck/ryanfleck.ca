---
date: 2019-10-11T17:54:00-04:00
title: "Passing Structs in C++"
tags:
  - Programming
  - C++
---

After a conversation with a friend revolving around passing structures to
functions, I decided to write a short tutorial on passing structures to
functions in _three different ways!_ I am **not** a very experienced C++
programmer, but hopefully these examples will illustrate to a beginner the
medley of ways that data can be passed into functions, and the pros & cons of
each method. Skip to the [end](#final-final-example) if you learn better by
reading code.
We will pass the structure below by:

1. [Value](#pass-by-value)
2. [Pointer](#pass-by-pointer)
3. [Reference](#pass-by-reference)

```cpp
// Our test structure:

struct Complex {
  double r, i;
};

// Goal: Complete the following functions

void display_by_value(Complex c);
void display_by_pointer(Complex *pc);
void display_by_reference(Complex &rc);
```

# Source

After installing `g++` and ensuring it runs from the command line, copy the
following C++ source code into a text file and save it as _whatever you would
like_, as long as the filename ends with `.cpp`, for instance, `structures.cpp`.

```cpp
#include <iostream>

struct Complex {
  double r, i;
};

int main(void) {

  struct Complex thing;
  thing.r = 2;
  thing.i = 4;

  return 0;
}
```

Ensure the following compiles by running `c++ structures.cpp` in your command
line and ensuring there are no syntax errors, and running the program with
`./a.out` to ensure there are no runtime errors. Provided that this code
compiles and runs (the output won't show anything, there is no output at the
moment,) you are ready to go!

For the greedy and patience impaired, skip to [here](#final-example) to see the
final source, or
[this file](https://github.com/RyanFleck/Projects/blob/master/cpp/rcf007_DataToFunctions.cpp)
to see the version-controlled one that may be
updated as I become a better C++ programmer.

# Pass by Value

To pass **by value** is to _make a copy_ for the function to use. The data
structure you pass to the function will be cloned on the stack and used by the
function. If you modify a structure that is passed _by value_, the original will
not be modified.

Passing by value is the easiest to program. First, add a function declaration
and definition:

```cpp
// Declare your function at the top:
void display_by_value(Complex c);

// Lower in the file, add your definition:
void display_by_value(Complex c) {
}
```

After adding these, your file will look like this (I won't repeat this in future
examples, to keep the article of the length reasonable.)

```cpp
#include <iostream>

struct Complex {
  double r, i;
};

void display_by_value(Complex c);

int main(void) {

  struct Complex thing;
  thing.r = 2;
  thing.i = 4;

  return 0;
}

void display_by_value(Complex c) {
}
```

Our function takes a `Complex` structure as input. As with in _main_, you'll be
able to access the properties of the properties of a _struct_ using the `.`
operator.

```cpp
void display_by_value(Complex c) {
  std::cout << c.r << " " << c.i << "\n";
}
```

Now all we need to do is add this function to our main body, passing the `thing`
variable to the function. The following code will print `2 4`, the contents of
the `thing` structure.

```cpp
#include <iostream>

struct Complex {
  double r, i;
};

void display_by_value(Complex c);

int main(void) {

  struct Complex thing;
  thing.r = 2;
  thing.i = 4;

  display_by_value(thing);
  //cout> 2 4

  return 0;
}

void display_by_value(Complex c) {
  std::cout << c.r << " " << c.i << "\n";
}
```

It is **very important** to note that passing by value passes a new copy of _the
entire object._ Modifications made within the function are made to this _new
copy_, and do not effect the original structure. To do that, you'll need to pass
by reference or pointer.

# Pass by Pointer

To pass by pointer, you can write your function with an asterisk (`*`) between
the structure type and variable name, like this:

```cpp
void display_by_pointer(Complex *pc) {
  std::cout << pc->r << " " << pc->i << "\n";
}
```

The arrow member operator (`var->attr`) is the operational equivalent of
`(*var).attr`, and makes it easy to access the properties of objects through
their references. Recall that, when passing a pointer, the name alone (`var`, in
this case) holds the address, and `*var` allows you to access the item itself.

Two different methods can be used to pass a pointer to your structure.

```cpp
// 1. Point a pointer at the struct
struct Complex thing;
Complex *ptr;
ptr = &thing;
display_by_pointer(ptr);

// 2. Give the function the address of the struct
struct Complex thing;
display_by_pointer(&thing);
```

Both cases will pass the _address_ of the Complex struct `thing` to the function
`display_by_pointer(Complex * pc)`. Passing the pointer does _not_ make a copy
of the original object, instead allowing the function to directly modify the
original object in place. Below, both function calls perform the same action:

```cpp
#include <iostream>

struct Complex {
  double r, i;
};

void display_by_pointer(Complex *pc);

int main(void) {

  struct Complex thing;
  Complex *ptr;
  ptr = &thing;
  thing.r = 2;
  thing.i = 4;

  display_by_pointer(ptr);
  display_by_pointer(&thing);

  return 0;
}

void display_by_pointer(Complex *pc) {
  std::cout << pc->r << " " << pc->i << "\n";
}
```

# Pass by Reference

Passing by reference allows the programmer to pass an object as if using a
pointer without having to use pointer notation within the function. All you have
to do is add an ampersand (`&`) behind the parameter that is to be referenced.

Since this example is programmed very similarly to passing by value, I will omit
the tutorial-style steps and cut right to the chase:

```cpp
#include <iostream>

struct Complex {
  double r, i;
};

void display_by_reference(Complex &rc);

int main(void) {

  struct Complex thing;
  thing.r = 2;
  thing.i = 4;

  display_by_reference(thing);

  return 0;
}

void display_by_reference(Complex &rc) {
  std::cout << rc.r << " " << rc.i << "\n";
}
```

It is important to remember that the structure manipulated inside the function
is _the original structure_. Changes made will effect the original, and persist
after the function exits.

# Final Example

Given that you were following along and writing everything in a single
source file, something like the following should be sitting in your text editor:

```cpp
#include <iostream>

struct Complex {
  double r, i;
};

void display_by_value(Complex c);
void display_by_pointer(Complex *pc);
void display_by_reference(Complex &rc);

int main(void) {

  struct Complex thing;
  Complex *ptr;
  ptr = &thing;
  thing.r = 2;
  thing.i = 4;

  display_by_value(thing);
  display_by_pointer(ptr);
  display_by_reference(thing);

  return 0;
}

void display_by_value(Complex c) {
  std::cout << c.r << " " << c.i << "\n";
}

void display_by_pointer(Complex *pc) {
  std::cout << pc->r << " " << pc->i << "\n";
}

void display_by_reference(Complex &rc) {
  std::cout << rc.r << " " << rc.i << "\n";
}
```

# Final Final Example

Additionally, to prove that changes made when passing by value will _not_ effect
the original object, and passing by pointer and reference _will_, run the
following example:

```cpp
#include <iostream>

/*
 * In this program, I'll use the following
 * types of comments to illustrate how things
 * are working:
 *   // Regular comment.
 *   //> Printed output
 */

struct Complex {
  double r, i;
};

// Our functions.
void display_by_value(Complex c);
void display_by_pointer(Complex *pc);
void display_by_reference(Complex &rc);

int main(void) {

  // Define a complex thing.
  struct Complex thing;
  Complex *ptr;
  ptr = &thing;

  thing.r = 2;
  thing.i = 4;

  std::cout << thing.r << "\n";
  //> 2

  display_by_value(thing);
  //> 2 4
  //> Set to 12 and 13
  //> 12 13

  display_by_pointer(ptr);
  //> 2 4
  //> Set to 24 and 25
  //> 24 25

  display_by_reference(thing);
  //> 24 25
  //> Set to 34 and 35
  //> 34 35

  display_by_value(thing);
  //> 34 35
  //> Set to 12 and 13
  //> 12 13

  return 0;
}

void display_by_value(Complex c) {
  std::cout << "\nValue:\n";
  std::cout << c.r << " " << c.i << "\n";
  std::cout << "Set to 12 and 13:\n";
  c.r = 12;
  c.i = 13;
  std::cout << c.r << " " << c.i << "\n";
}

void display_by_pointer(Complex *pc) {
  std::cout << "\nPointer:\n";
  std::cout << pc->r << " " << pc->i << "\n";
  std::cout << "Set to 24 and 25:\n";
  pc->r = 24;
  pc->i = 25;
  std::cout << pc->r << " " << pc->i << "\n";
}

void display_by_reference(Complex &rc) {
  std::cout << "\nReference:\n";
  std::cout << rc.r << " " << rc.i << "\n";
  std::cout << "Set to 36 and 37:\n";
  rc.r = 34;
  rc.i = 35;
  std::cout << rc.r << " " << rc.i << "\n";
}
```

<br />
<hr />

If you enjoy my programming tutorials, please subscribe to my [youtube
channel](https://www.youtube.com/channel/UCjYQgnRYXjatVkGgNTAMyfQ) for weekly
uploads of fresh digital content.

---
tags:
date: 2019-10-11T17:54:00-04:00
title: "Passing Structures in C++"
---

Draft preview. Work in progress.

After a conversation with a friend revolving around passing structures to
functions, I decided to write a short tutorial on passing structures to
functions in *three different ways!* I am **not** a very experienced C++
programmer, but hopefully these examples will illustrate to a beginner the
medley of ways that data can be passed into functions, and the pros & cons of
each method. We will pass the structure below by:

1. [Value](#pass-by-value)
2. [Pointer](#pass-by-pointer)
3. [Reference](#pass-by-reference)


```cpp
// Our test structure:

struct Complex {
  double r, i;
};
```

# Source 

After installing `g++` and ensuring it runs from the command line, copy the
following C++ source code into a text file and save it as *whatever you would
like*, as long as the filename ends with `.cpp`, for instance, `structures.cpp`.

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

To pass **by value** is to *make a copy* for the function to use. The data
structure you pass to the function will be cloned on the stack and used by the
function. If you modify a structure that is passed *by value*, the original will
not be modified.

# Pass by Pointer



# Pass by Reference


# Final Example

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

void display_by_value(Complex c);
void display_by_pointer(Complex *pc);
void display_by_reference(Complex &rc);

int main(void) {
  std::cout << "Hello, World!\n";
  //> Hello, World!

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

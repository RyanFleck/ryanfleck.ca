#include <stdio.h>

void main(void) {

  short print(char *str) {
    printf("Address  -> Content\n===================\n");
    while (*str != '\0') {
      printf("%x -> %c\n", str, *str);
      str++;
    }
  }

  // This IS a pointer to the first character.
  char xyz[6] = {'h', 'e', 'l', 'l', 'o', '\0'};

  print(xyz);
}

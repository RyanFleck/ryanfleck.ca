---
date: 2020-01-14T11:32:02-05:00
title: "Paper over Keyboard"
draft: false 
tags:
- Life-Lessons
- Programming 
---

So, I completed a HackerRank problem this morning to work my brain back into
shape for upcoming interviews. The problem is titled *The Minion Game*, and
the lesson I learned while completing this problem was *measure twice, cut
once*, **aka** I didn't spend enough time thinking about the problem before
programming.

Working out a programming problem on paper first will help you solve it most of
the time.

[hackerrank.com/challenges/the-minion-game/problem](https://www.hackerrank.com/challenges/the-minion-game/problem)

<br />

### Question

Kevin and Stuart want to play the 'The Minion Game'.

**Game Rules**

Both players are given the same string, *S*.
Both players have to make substrings using the letters of the string *S*.
Stuart has to make words starting with consonants.
Kevin has to make words starting with vowels.
The game ends when both players have made all possible substrings.

**Scoring**

A player gets +1 point for each occurrence of the substring in the string *S*.

**For Example:**

String *S* = BANANA
Kevin's vowel beginning word = ANA
Here, ANA occurs twice in BANANA. Hence, Kevin will get 2 Points. 

### Working Answer

Here is my final, tidy answer that runs in `O(n)`. The single calculation `score
= (string_len - iletter)` was previously completed by breaking the substring
into a set of smaller substrings and counting them with a for loop. After
sitting back, pondering the question, and understanding that this larger
calculation was unneccesary (terrible original answer in next section,) my
algorithm improved to `O(n)` time and was able to run in the time limit imposed
by HackerRank.

```py
def minion_game(string):
    string_len = len(string)
    stuart = 0
    kevin = 0

    for iletter in range(string_len):
        score = (string_len - iletter)
        if string[iletter] in ['A','E','I','O','U']:
            kevin = kevin + score
        else:
            stuart = stuart + score

    if stuart > kevin:
        print("Stuart " + str(stuart))
    elif kevin > stuart:
        print("Kevin " + str(kevin))
    else:
        print("Draw")
```

### Original Answer

This answer kept failing because it took far too long. It runs in `O(n^2)` and
originally used *four* loops, three more than the working answer.

```py
def v(word):
    if word[0] in ['A','E','I','O','U']:
        return True
    else:
        return False

def minion_game(string):
    
    substrings = []
    substrings_vowels = []
    string_len = len(string)

    for iletter in range(string_len):
        for isubletter in range(iletter+1, string_len+1):
            substring = string[iletter:isubletter]
            if v(substring):
                if substring not in substrings_vowels:
                    substrings_vowels.append(substring)
            elif substring not in substrings:
                substrings.append(substring)


    # Stuart - Consonants
    print("\nStuart")
    stuart = score(string, substrings) 

    # Kevin - Vowels

    print("\nKevin")
    kevin = score(string, substrings_vowels)

    if stuart > kevin:
        print("Stuart " + str(stuart))
    elif kevin > stuart:
        print("Kevin " + str(kevin))
    else:
        print("Draw")

def score(original_string, list_of_strings):
    total = 0
    for item in sorted(list_of_strings):
        icount = original_string.count(item)
        print("{} : {}".format(item,icount))
        total = total + icount

    return total
```

HR Snippet:

```py
if __name__ == '__main__':
    s = input()
    minion_game(s
```

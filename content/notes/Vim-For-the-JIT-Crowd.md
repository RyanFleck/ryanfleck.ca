---
tags:
- Vim
- Programming Tools
date: 2019-07-08T16:44:16-04:00
title: "Vim for the JIT Crowd"
subtitle: ""
---

VIM is the best programming tool, full stop. This short guide will take the average JIT[^1] student from *"why would I use this silly terminal thing"* to **"ohmygod where has this amazing tool been all my life?"** in 5 minutes, plus an hour or so of experimentation and adapting to the keybindings.

## 1. What is VIM?
VIM is a text editor with infinite reprogrammability, time-traveling and full-line undo, and a seemingly endless list of very useful functionality. [There is no end to the things you can learn about VIM.](https://sanctum.geek.nz/arabesque/vim-koans/) Notably, it has been released and developed as *Charityware*[^2]. Open a file by typing:
```shell
vim filename.extension
```

If you typed in that simple command correctly, VIM will open your file.

## 2. How to use VIM

Structurally, VIM is designed to allow a programmer to move, cut, find, paste, delete, and program as fast as is humanly possible, moving all menus and buttons into the back of the user's head, so all focus can be placed on the program. VIM's learning curve is steep but short.

**To use the VIM text editor, you need to remember a few simple rules:**
1. **ESC** brings you to *Command Mode* where you can use commands.
2. Simple commands can be combined for more powerful editing.
3. The bottom left corner shows the *Mode*, and is blank in command mode.
4. Using *:* allows you to use EX commands like **:wq** to save and quit, **:q!** to quit without saving anything, or **:![command]** to execute a shell command.

**Simple *Command Mode* operations:**
1. **hjkl** moves the cursor, **e** moves to the **e**nd of a word, **w** moves one **w**ord forward, **b** moves **b**ack one word, **$** moves to the end of a line.
2. **a** **a**ppends text, **i** **i**nserts text.
3. **x** deletes a character.
4. **d** is the **d**elete command, needs to be used with a movement.
5. **/** will search through the text. (**n** moves to **n**ext instance of search.)
6. **u** is **u**ndo and **Ctrl r** is redo, **:undolist** shows an undo *tree*.
7. **V** or **v** visually selects, **y** is **y**ank, **p** is **p**aste.

**C-C-C Combo Examples:**
1. **d w** deletes a word.
2. **d 100 w** deletes 100 words. (Yes, you can specify quanitities with most commands.)
3. **10 j** moves down 10 lines.

**Useful EX Commands:**
1. **:set number** and **:set nonumber** turn line numbering on and off.
2. **:w** is to write, **:q** is to quit, **:wq** is to save and exit.

## 3. Modifying VIM

The true power of VIM lies in its flexibility. My personal **.vimrc** is very small and tuned for editing C. Take a quick read, but implementing a robust .vimrc will not be covered in this post, as it is intended to introduce the user to simple editing and navigation within VIM.

```vimrc
syntax on
colorscheme ron
set tabstop=2
set shiftwidth=2
set softtabstop=0
set expandtab
set smarttab
set autoindent

nnoremap <F4> :! clear && gcc % && clear && ./a.out<cr>
```


## 4. Additional Resources

VIM provides an interactive help menu, **:help**. Typing '**vimtutor**' in your shell will bring up an interactive tutorial to teach you the basics outlined above in a very nice hand-holding way. The verbose MAN pages are, as always, available by typing **man vim** in your shell. [Consider reading these koans.](https://sanctum.geek.nz/arabesque/vim-koans/) Below is a picture of *vimtutor*.


Thanks for reading.

Ryan Fleck

[^1]: **JIT:** *Just In Time*, an idea applied to many fields, applicable here in reference to *just in time compiling*, where a program is compiled at run time during program execution.
[^2]: VIM is **Charityware** in support of needy children in Uganda. Users of VIM are encouraged to make a donation via [ICCF.](http://www.vim.org/iccf/)

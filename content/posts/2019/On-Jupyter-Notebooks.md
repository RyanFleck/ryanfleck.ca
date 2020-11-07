---
date: 2019-07-17T12:34:56-04:00
title: "Jupyter Notebooks"
draft: true
tags:
  - Python
  - Programming
  - Jupyter-Notebooks
---

If you are a Python programmer, you absolutely must use the fantastic
amalgamations of documentation, code, and code output commonly known as Jupyter
Notebooks. Installing, assuming you have `python3` installed, is as simple as
running:

```sh
pip3 install juptyer
```

After this, you can simply tell your console `juptyer notebook` in your project
folder, and your default browser will open a window to a file list. Clicking
'new', then 'Python 3 Notebook', will get you started right quick.

_What have you just opened up?_

Before you is the splendor of an `.ipynb` file. You can add and intermingle
'cells' containing code and text. Hitting `ENTER` edits the cell, and
`SHIFT-ENTER` runs the cell, printing
any results immediately below the cell. The output can be
anything from text, to tables, to images and graphs.

Even better, the editor supports most _vim_ keybindings: `j` and `k` for upwards
and downwards movement, and `esc` kicks the user into command mode.

Changing the cell type is as easy as hitting `m` for markdown, or `y` for
code. New cells can be created with `b`. If you've forgotten anything, it's
easy to use `h` to see commands, or `p` to search commands.

At this point, you should go and read some tutorials on using common data
science and plotting libraries like pandas and matplotlib. Enjoy your new tool!

**Me?** I've used them in the past to take notes while learning new
libraries and tech, and plan to use them for teaching someday.

As the `.ipynb` files can be converted to HTML or Markdown, I'm certain
that more than a few future posts will end up being written in Jupyter!

---
tags:
date: 2019-07-17T12:34:56-04:00
title: "On Jupyter Notebooks"
subtitle: "Fantastic interactive webpages with code, notes, results, and images."
draft: true
---

If you are a Python programmer, you absolutely must use the fantastic amalgamations of documentation, code, and code output commonly known as Jupyter Notebooks. Installing, assuming you have `python3` installed, is as simple as running:

```sh
pip3 install juptyer
```

After this, you can simply tell your console `juptyer notebook` in your project folder, and your default browser will open a window to a file list. Clicking 'new', then 'Python 3 Notebook', will get you started right quick.

*What have you just opened up?*

Before you is the splendor of an `.ipynb` file. You can add and intermingle 'cells' containing code and text. Hitting `SHIFT-ENTER` runs the cell you are currently editing, and prints any results below the cell. The output can be anything from text, to tables, to images and graphs.

At this point, you should go and read some tutorials on using common data science and plotting libraries like pandas and matplotlib. Enjoy your new tool!

```py
def test():
    ans = 1 + 1
    print("A basic program. 1+1="+str(ans))
    print("This is a very long string, and it should go way, way off the right edge of the screen, so far that the user will have to scroll to see it. Yeah. That far. Wow. Neato.")
```

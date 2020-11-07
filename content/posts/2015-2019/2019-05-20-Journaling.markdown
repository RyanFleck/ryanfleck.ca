---
title: "My Personal Journaling System"
date: 2019-05-20 06:19:13
---

Perhaps the most valuable thing I've done for myself in recent months is beginning to write daily, about my life and my thoughts, in a critical and introspective way. This post is about the tools I have developed to make journaling quick and accessible from any machine.

![Image.](/legacy/howIJournal/journal-entry.png){: .center-image }

Above is the latest iteration of the `je` tool, which is now [public and open source.](https://github.com/RyanFleck/Journal). Since I'm always near a command line, I decided to build tools that allowed me to quickly add entries and view the journal in its entirety. Running the `je` command adds a timestamp and opens a new vim instance to the bottom of the daily entry. To view entries, I run `jv`, which builds the journal (now in a tenth of a second thanks to _Hugo_,) and opens it in a web browser.

When I first began writing digital journal entries, I wrote unnecessarily complex shell scripts that added entries to a private path on my github site. These scripts were run daily by my [bot](https://github.com/RCF-LAB-BOT). With this system, I had to go back and remove empty entries manually. I scripted this pruning process after becoming fed up with removing days, sometimes weeks, of empty entries by hand. After moving out and losing my ability to automate from home, I refactored my `je` (journal-entry) script to only write entry files when I began writing a timestamped entry. This removed the need for both automation and the removal of empty entries.

Time passed, and my GitHub academic credentials expired. This meant my public sites served from private repositories would be shuttered. To keep my personal site up and running, I'd have to strip all the private data and re-upload it in a public repository. This presented me with an excellent opportunity to re-write my journaling tools, which I [took](https://github.com/RyanFleck/Journal).

Writing this tiny program for myself has taught me plenty about the evolution of developer tools: There's always a better, faster, more complex, or less complex way to accomplish a task. It's up to you, the developer, to choose the correct language and tools to complete the task while keeping your optimization priorities in mind.

No matter what tools you use, I cannot recommend daily journaling enough. _To write well is to think clearly,[^1]_ and there is no better thing to think about for self and societal improvement than your daily life, the people around you, your current circumstances, and your potential future paths.

[^1]: _David McCullough_, during an interview with NEH chairman Bruce Cole.

<br />

Thanks for reading,

<img src="/legacy/art/s.png" alt="RCF" style="border-radius:0; width: 289px;"/>

<br />

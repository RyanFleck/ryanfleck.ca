---
title: "Tone Analysis Workshop"
date: 2021-02-05T19:24:50-05:00
toc: true
tags:
---

# Introduction

The following was posted to the uOttaHack 4 Discord, and I think it's a pretty
reasonable introduction to the content I'll be discussing in this post.

> Hey, I'm Ryan,
>
> Tonight (9PM!) I'll be teaching y'all how to read the thoughts of your to detect emotion in the content that your users post, and in general, how to find and use free APIs to make your program AWESOME!
>
> If you know how to write some python, you can use the power of the web to suggest cocktails, get stock information , news, recognize faces, and translate text.
>
> Come along with me (this is a workshop for beginners,) as we implement a small web app using flask, and call the IBM Watson Tone Analysis endpoint to process journal entries and let users see what kinds of emotions are locked up in their prose!
>
> See you all at 9, and bring a friend!

# Prerequisites

1. A bit of Python knowledge
2. An IBM Cloud Account (you can make this now, steps below)
3. A Repl.it account (you can also make this later)

# IBM Cloud

There's a lot of buttons and fancy things in the IBM Cloud control panels, so
here's how to sign up and get your API Keys and URL:

1. Search for "IBM Cloud" or go to <https://www.ibm.com/cloud>

![search for IBM Cloud](/pics/uohack/duckduckgo.png)

2. Click the sign-up link. (Just want to be exhaustive here.)

![IBM Cloud](/pics/uohack/ibm-cloud.png)

3. Create an account and verify your email (you've got to be 16?)

![Create Account](/pics/uohack/ibm-cloud-create-account.png)

4. Once everything boots up, search for **tone** and click _Tone Analyzer_.

![Search for Tone](/pics/uohack/search-for-tone.png)

5. Create the tone resource on the _Lite_ tier, unless you want to pay.

![Create Tone Resource](/pics/uohack/create-tone.png)

6. Nab your credentials from the **Manage** view.

![Get Credentials](/pics/uohack/credentials.png)

These two strings (the API key and endpoint URL) should be guarded from
everyone, as the API key is uniquely yours, and the endpoint URL may change
between deployment environments. _More on that later._
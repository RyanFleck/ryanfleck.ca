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

# The Magic of APIs

Public APIs allow developers to submit data/queries, or simply `GET` data from
endpoints that are accessible via the web. By integrating calls to well-built
and fast APIs into your app, you can add tons of value for users by combining
their own data and data grabbed from APIs in unique ways.

Today I'll be showing you how to use the **Tone Analyzer** endpoint on IBM
Cloud. I figured that, with a focus on mental health, getting to know how our
users are feeling by analyzing what they're saying would be useful, though
perhaps a little bit _evil._

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

# I've Got my API Keys, Now What?

Time to read some docs. You could dive into [the API
Documentation](https://cloud.ibm.com/apidocs/tone-analyzer), or continue
reading. If you'd like to follow along in a different language, at your own
peril, the IBM documentation has a variety of client libraries and languages
that it supports. For a quick guide to the endpoint, read on.

![Languages](/pics/uohack/docs-languages.png)


# Start up a REPL.it Project

Make an account and create a new REPL

![Languages](/pics/uohack/replit-new.png)

Make it a regular _Python_ repl and name it something cool.

![Languages](/pics/uohack/replit-python.png)

Add a package with this button on the left side:

![Languages](/pics/uohack/replit-packages.png)

Search for _"ibm-watson"_ and add it.

![Languages](/pics/uohack/replit-addpackage.png)

Wait for the installation to complete...
 
![Languages](/pics/uohack/replit-installing.png)

**Bam.** _We're ready to go!_

# Storing our Secrets

Before we start writing any python code, create a new file named `.env` (yes,
that's it, no extensions!) to hold your URL and API key. Inside, write this,
replacing my partial key and URL with your full API key and URL:

```
TONE_KEY=Nsvly...
TONE_URL=https://api.us-south.tone-an...
```

Make sure the caps and spacing are exact, or we won't be able to get the
environment variables. If you're following along on a local copy of Python,
you'll need to use the dotenv package to load the contents of this file, or you
can just keep 'em as strings.

# Before the Magic, You've Gotta Authenticate!

Add or type these lines into your `main.py` file.

```py
from ibm_watson import ToneAnalyzerV3
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator
import os
```

Bring those environment variables we set into some python variables.

```py
key:str = os.getenv("TONE_KEY")
url:str = os.getenv("TONE_URL")
```

Lastly, we can set up a new authenticator object to prepare to send API calls.
You only need to do this once, so don't repeat this every time you make a call.

```py
authenticator = IAMAuthenticator(key)
tone_analyzer: ToneAnalyzerV3 = ToneAnalyzerV3(
    version='2017-09-21',
    authenticator=authenticator
    )

tone_analyzer.set_service_url(url
```

# A Simple Call

Now, with the following python:

```py
response = tone_analyzer.tone(
    "Perhaps, if I had made a different turn on life's winding paths all those"\
    "ages ago, I wouldn't have found myself in so fortunate a position. Now I"\
    "can smoke a thousand cigarettes a day, and they can't give me cancer due"\
    "to my mechanical lungs! Hahahahaha!"
    ).get_result()

print(response)
```

You can get a response from the API like this:

```json
{
    "document_tone": {
        "tones": [
            {"score":0.664175,"tone_id":"tentative","tone_name":"Tentative"},
            {"score":0.771025,"tone_id":"analytical","tone_name":"Analytical"}
        ]
    },
    "sentences_tone": [
        {
            "sentence_id": 0,
            "text": "Perhaps, if I had made a different turn on life's winding paths all those ages ago, I wouldn't have found myself in so fortunate a position.",
            "tones": [{"score":0.589295,"tone_id":"analytical","tone_name":"Analytical"}]
        },
        {
            "sentence_id": 1,
            "text": "Now I can smoke a thousand cigarettes a day, and they can't give me cancer due to my mechanical lungs!",
            "tones": [{"score":0.599421,"tone_id":"analytical","tone_name":"Analytical"}]
        },
        {
            "sentence_id": 2,
            "text": "Hahahahaha!",
            "tones": []
        }
    ]
}
```

# A REPL (In REPL.it, ha!)

Open <https://repl.it/@RyanFleck/tone-analysis-repl#main.py> and fork to tinker
from this point.

```py
def analyze(text:str):
    print("Analyzing...  ", end="")
    res = tone_analyzer.tone(text).get_result()
    document_tones = res["document_tone"]["tones"]
    emotions = ", ".join(list(map(lambda x: x["tone_name"], document_tones)))
    if not emotions:
        emotions = "nothing."

    print(f"detected emotions: {emotions}")

while True:
  text = input("OwO >> ")
  analyze(text)
```
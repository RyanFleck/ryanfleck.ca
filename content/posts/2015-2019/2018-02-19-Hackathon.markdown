---
title: "Attending UOttaHack 2018"
date: 2018-02-19 12:13:14
toc: true
---

# Preamble

This past weekend, I attended uOttawa's first MLH[^1] Hackathon. After a long work week, I was prepared to show up and enjoy the event, but not to directly participate or join a team. Skipping the overnighter was, at the beginning of the event, a sad but necessary plan.

All thoughts of having a relaxing weekend were thrown out the window as I was unsuspectingly amalgamated into a very interesting group of people:

- **D**, a drifting developer with a colorful past involving surfing everywhere, selling tacos, PHP and chillaxing.
- **Q**, a top-grade Biomechanical Engineering student who knew very little about programming but _did_ have keys to the Makerspace and helped with the smart contracts.
- **C**, a psychology grad who finished most of an engineering degree, has an engineering job and spent a while exploring the world.

Having said this, I met all these people _after_ the opening notes.

# Opening Notes

**uOttaHack 2018** began with a long presentation; every sponsor stood up and gave us a motivational speech on the greatness of their respective companies and the amazing role they could play in our personal future. It seems difficult these days to tell accounting firms and banks from technology companies.

A few of the presenters did seem genuinely concerned for our future wellbeing, but it was commonly known among the student body that these workplaces were nothing like the paradisal work/life balances depicted by the presenters.

Shortly after the opening ceremonies, there was a career fair, and the actual "hacking" was to begin a couple hours later, at lunch, and last 24 hours. It was here that I struck up conversations with a few people, but most notably, "C" and D, who were previously having a conversation of their own. I learned a bit about the two of them, and after C pitched his idea to us, and we consulted with Q about printing parts for the project, (she was running a table for the Makerspace,) we decided to become a team. While Q was not actually registered for the event and was, like me, counting on a good night's sleep, she ended up helping us with our project and staying overnight.

# The Hacking Begins

Programming began immediately after our group had solidified. I began by apt-getting the Arduino IDE from the Debian repos... Only to find that I didn't have binaries for the Intel Arduino. Downloading the variant of the IDE from the official site gave me access to the Intel 101 drivers, but I could still not interact with the board. Being used to the foolproof process of connecting then uploading to a generic Uno/Nano, I was quickly frustrated with the unusable Intel board and decided to get a real one from the Makerspace.

C gave us a tutorial on how to use Metamask, an ethereum wallet built as a chrome extension. It was my first interaction with any blockchain, and basically what I expected- an object that contained data, backed up with a signed and sealed revision history. Our group was given a quick intro to the "Solidity" object-oriented contract language by C.

Shortly after this, we moved to the Makerspace, and attempted to interface with another Arduino... and still, no luck! The rest of my team was beginning to doubt the stability and utility of my Debian operating system. Laughably, when we tried it on Q's Windows machine, the new Arduino also failed to connect, and Q remembered that the Arduino she pulled was actually from _a bag of dead Arduinos._ After much ribbing, we grabbed a fresh Arduino and programming the light system took no time at all.

Around (10?) we had a visit from on of Q's friends, a true intellectual who had grown up in Ottawa, gotten his undergradutate degree and masters' from uOttawa, and was working towards his PHD. (All Chemical Engineering.) This career student was so confident in his personal social graces and intellectual superiority that it took us the greater part of half an hour to get him, being unbelievably unwanted, to leave.

Come 2400, we were still working hard, so much so that we worked through the _Midnight Snack with Github_. I was dissapointed when I read the clock and it said 0058.

# Finishing Touches

Our productivity dropped drastically as we approached 24 straight hours of programming. Come breakfast we had all the components made, but still had to massage some bits and implement a frontend. This did happen, but was never properly connected to the system before the showcase.

Roughly ten minutes before submission, we remembered that documentation was important, and we needed images and video to place within our submission. The following ten minutes were intense, and we submitted our project with ~10 seconds to go... before we realized that the deadline was 11:15, not 11. HackerEarth, the questionable submission site, managed to hold on to most of what we uploaded.

# Closing Notes

C and D left before the closing notes. I was not surprised with the winner or one of the top-five, but the other three left me a bit confused, as they were not particulariy original and looked like they had been conceptualized long before the event. (I know the top prize had, but the top prize was also great.)

I think my favourite winner was the single project that used a Qualcomm Dragonboard (And won Qualcomm's prize,) named "Visual Eyes" A doorbell for blind people that used face recognition and criminal databases to tell if the person at your door was familiar, or somebody with a record.

If I'm being perfectly honest with myself, I was a little bitter that we hadn't won some small prize. I had worked pretty hard all night, and our project clearly just wasn't marketed well enough. _(Note to self, get MBA.)_

# Notes For Next Time

1. **Shoulda used the Dragonboard!** Our team didn't make enough good use of the technology that was available to rent for challenges. I regret not implementing our project with a _Qualcomm Dragonboard_, especially when I heard at the demo session (immediately before the closing ceremonies,) that it ran headless GNU/Linux. I was already running everything on headless GNU/Linux...
2. **Always pick fresh people for your team.** I had an absolute blast meeting new people at this event, and am thankful that I attended primarily for this reason. People can be very interesting and have lots to say if you bother getting to know more than their name.
3. **Don't be a dipswitch and pre-plan your hack.** of the several winning parties, it was clear that only two or three had conceived original ideas during the hackathon for submission. The moral of the story here is: _Spend extra time outside of work developing things for your overlords and you will be rewarded._
4. Intel Arduinos are proprietary garbage, and an exception to the note no.1 above. As far as I can tell from the half an hour I spent fiddling with the thing, _Intel 101 boards are just gimped Arduino Uno boards._

# A Note on Hacker Culture:

The term "**hacker**" used to refer to a cultural subset of computer scientists with an [ethos indifferent to fame and wealth and a calculated disregard for power.](https://aeon.co/essays/how-yuppies-hacked-the-original-hacker-ethos) The hacker community is alive and well today, in the form of the FSF, EFF, TOR, Wikileaks and Anonymous, but have separated themselves from the word (but not the culture,) as a result of rampant co-opting. Mainstream Media took the word and made it synonymous with aggressive criminal data thieving. Corporate has now began gentrifying the term, passing it off as a cheap and hollow means of shilling their products and services. Many members of "hacking" communities today fetishize profits and lack the anti-conventional yearning for an open commons and private information. Companies like Google have taken computing and warped it to exploit users and generate revenue.

So, let it be known that while I enjoyed participating in the event, I have gratuitous amounts of dislike for the word _Hackathon_. Having said this, without money an event of this scale would not have occurred, and I do appreciate the free food and opportunity to meet new friends.

# Final Thoughts

**uOttaHack 2018** was fun enough- I should have tried to attend all the little side events and talks though, rather than persuing the fruitless endeavor that was working on our project.

Thanks for reading,

<img src="/legacy/art/s.png" alt="RCF" style="border-radius:0; width: 289px;"/>

[^1]: **MLH:** [Major League Hacking](https://mlh.io/), the _"official student hackathon league"_.

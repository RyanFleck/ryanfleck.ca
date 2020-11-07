---
date: 2020-09-14T02:34:37-06:00
title: "Embedded WebVR Panoramas"
draft: false
tags:
- WebVR
- JavaScript
---

This is a test to embed WebVR content on a webpage.

**Warning:** huge image, (~10mb) so don't open while using mobile data.
I'll probably be able to improve the performance of the page by
compressing the image somehow.

Here's the flat image:

![photo sphere](/pics/experimental/3d/texas/photo-sphere.jpg)

Here's the A-Frame rendering a portion of the image:

<iframe style="border: 0px solid black;" width="100%" height="400px" src="/pics/experimental/3d/texas/"></iframe>

Using <https://social.shorthand.com/hadders/j2uMHSOuUT/using-360degree-media-in-your-web-pages>

Potentially more performant solutions:

- [Sharing 360 photos](https://photography.tutsplus.com/tutorials/how-to-share-360-panorama-photos-with-webvr-and-a-frame--cms-27648)

Failures:

- Using <https://developers.google.com/vr/develop/web/vrview-web> failed.

---
tags:
date: 2020-09-14T02:34:37-06:00
title: "Embedded WebVR Panoramas"
draft: false
---

This is a test to embed WebVR content on a webpage.

Here's the flat image:

![photo sphere](/pics/experimental/3d/texas/photo-sphere.jpg)

Here's the A-Frame rendering a portion of the image:

<script src="https://storage.googleapis.com/vrview/2.0/build/vrview.min.js"></script>
<script>
  window.addEventListener("load", updateVRImages);
  function updateVRImages(){
    var vrPicOne = new VRView.Player("#vr-pic",{
      image: "/pics/experimental/3d/texas/photo-sphere.jpg",
      width: "100%",
      height: "400px"
    });
  }
</script>

<div id="vr-pic"></div>

Using <https://developers.google.com/vr/develop/web/vrview-web>

<iframe src="https://storage.googleapis.com/vrview/2.0/embed?image=/pics/experimental/3d/texas/photo-sphere.jpg">
</iframe>
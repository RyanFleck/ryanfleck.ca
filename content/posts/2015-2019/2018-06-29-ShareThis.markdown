---
title: "Custom ShareThis Buttons"
date: 2018-06-29 15:21
draft: true
---

Social media integrations are important for any organization dependant on the public for support. This post is an experimental page, an attempt to configure custom ShareThis buttons to include additional data in the shared post body when clicked.

Stock [_ShareThis_](https://platform.sharethis.com) buttons typically appear like so:

<div class="sharethis-inline-share-buttons"></div>

<br />

Custom _ShareThis_ buttons, with additional information in the post body, appear as follows:

<!--FACEBOOK-->
<div 
  data-network="facebook"
  class="rcf-sharethis st-custom-button">
  <svg class="svg-icon"><use xlink:href="/legacy/minima-social-icons.svg#facebook"></use></svg></div>

<!--TWITTER-->
<div 
  data-network="twitter" 
  class="rcf-sharethis st-custom-button">
  <svg class="svg-icon"><use xlink:href="/legacy/minima-social-icons.svg#twitter"></use></svg></div>

<!--LINKEDIN-->
<div 
  data-network="linkedin" 
  class="rcf-sharethis st-custom-button">
  <svg class="svg-icon"><use xlink:href="/legacy/minima-social-icons.svg#linkedin"></use></svg></div>

<!--EMAIL-->
<div 
  data-network="email" 
  class="rcf-sharethis st-custom-button">
  <svg class="svg-icon"><use xlink:href="/legacy/minima-social-icons.svg#email"></use></svg></div>

<br />

<br />

According to the guide [on the sharethis website to create custom buttons,](https://www.sharethis.com/support/customization/how-to-set-custom-buttons/) all sorts of data can be included within posts. Above are the generic buttons, but I need to apply these properties to custom buttons. Ensuring that the title and message are consistent and clear across platforms is important, but each platform uses the ShareThis parameters in a different way. Twitter seems to ingnore the description, and will only use `data-title`. Emails need to have the title and description rolled into `data-message` with newlines for readability. Email SVG [found here.](http://healthysoleplus.com/legacy/rrssb/icons/)

The obscure docs can be reduced to four simple steps:

1. Load the sharethis js that is given upon registration.
2. Add the class `st-custom-button` to the custom sharethis divs.
3. Add any custom properties to the divs _as html properties_.
4. Target the divs in additional js and add these lines:
   - `var elm = e.target;`
   - `var network = elm.dataset.network`

I'm especially happy with how the custom email output is rendered:

![email](/legacy/mnp/ShareThis.png){: .center-image }

**Possible future improvements:**

- Truncate excerpt based on the combined length of the title and link for twitter sharing.
- Add email icon for email sharing button.

**Current JavaScript for buttons:**

```js
console.log("RCF-SHARETHIS TESTS RUNNING:");
var buttons = 0;

$("div.rcf-sharethis").each(function () {
  buttons++;
  console.log("BUTTON " + buttons + " found, adding properties.");
  //Attributes should be added here, will fix soon.
});

$("div.rcf-sharethis").click(function (e) {
  var network = $(this).attr("data-network");
  network = network.charAt(0).toUpperCase() + network.slice(1);
  console.log(network + " sharing button clicked.");

  //Add attributes:
  var shareDescription = " page.title \n page.excerpt \n";
  var emailDescription =
    " page.title \n\n page.excerpt \n\nRead more at page.link";
  $(this).attr("data-title", shareDescription);
  $(this).attr("data-description", shareDescription);
  $(this).attr("data-message", emailDescription);
  $(this).attr("data-image", "/legacy/VimScreenshot.png");

  var elm = e.target;
  var network = elm.dataset.network;
});
```

<br />

Thanks for reading,

<img src="/legacy/art/s.png" alt="RCF" style="border-radius:0; width: 289px;"/>

<script>
  console.log("RCF-SHARETHIS TESTS RUNNING:");
  var buttons = 0;
 
 $("div.rcf-sharethis").each(function(){
    buttons++;
    console.log("BUTTON "+buttons+" found, adding properties.")});


  $("div.rcf-sharethis").click(function(e){
    var network = $(this).attr("data-network");
    network = network.charAt(0).toUpperCase() + network.slice(1);
    console.log(network+" sharing button clicked.");
  
    //Add attributes:
    var shareDescription = ("{{ page.title }}\n{{ page.excerpt | strip_html | strip }}\n");
    var emailDescription = ("{{ page.title }}\n\n{{ page.excerpt | strip_html | strip }}\n\nRead more at {{ site.url }}{{ page.url }}");
    $(this).attr("data-title",shareDescription);
    $(this).attr("data-description",shareDescription);
    $(this).attr("data-message",emailDescription);
    $(this).attr("data-image","/legacy/VimScreenshot.png");
    
    //Sharethis code:
    var elm = e.target;
    var network = elm.dataset.network;
    
    });
  
  console.log("Sharethis commands run.");
</script>

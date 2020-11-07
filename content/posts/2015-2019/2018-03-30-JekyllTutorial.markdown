---
title: "Build a Personal Website in an Afternoon"
date: 2018-03-30 09:16:02
toc: true
---

# Tutorial Overview

If you've ever wanted a personal website; a place to showcase your experiments and opinions, away from pre-configured themes and terribly named domain postfixes, [_Jekyll_](https://jekyllrb.com/), [_Kramdown_](https://kramdown.gettalong.org/), [_SASS_](https://sass-lang.com/), and [_Github Pages_](https://pages.github.com/) may be just the tools for you. The following post will present, in a thoughtful and concise manner, the material needed to get a website up and running at _yourname.github.io_.

By following this tutorial, you will learn how to use git and github to manage your code, html to structure pages, sass to style them, and jekyll to dynamically smash html together. First, we will **setup** by installing ruby, git and electron. If you want to use a different method, or already have ruby and git installed, that is _excellent._ The github.io domain is free to use (see [pages.github.com](https://pages.github.com/),) and beats having to worry about domain renewal once a year.

_Technically, the setup phase could be skipped entirely_, and all development could occur within _Github_. Development on desktop is faster and encouraged as changes can show up _immediately_ on our localhost, and your page will be built with each file-save, compared to a soft limit of 10 page builds per hour on Github Pages.

Once all our tools are ready, we will **develop** our site by modifying the html and css provided by the [_Minima_](https://github.com/jekyll/minima) theme. This tutorial _does not_ utilize the gem-based minima theme; to understand _why_ we are changing things, it is important to understand how Jekyll/SASS compiles your work into static HTML and CSS.

Finally, we will author a simple post with markdown, and enjoy the beautifully formatted final output on your new website!

**Why use Jekyll?** [ask Parker, the creator.](https://byparker.com/blog/2014/jekyll-3-the-road-ahead/)

## Prerequisites

- [A stable Operating System that can deal with development tools reliably.](https://www.quora.com/What-OS-is-the-best-for-software-engineers)[^1]
- Basic version control skills. [This 10-minute read is a great place to start, and enough for this tutorial.](https://guides.github.com/activities/hello-world/)
- A [github account](https://github.com/), preferably created with your university email to take advantage of the [Github Student Developer Pack.](https://education.github.com/pack)

Please be aware that _git_ and _Github_ are separate entities; _git_ is a version control system, to reliably track changes to a codebase. _Github_ is a hosting site for remote git repositories. Both are excellent development tools.

The [_Github Student Developer Pack_](https://education.github.com/pack) contains a plethora of **free** development tools from major vendors, including Amazon, Microsoft, Digital Ocean (cloud hosting,) Hackhands (live programming help,) NameCheap, Stripe, and the Unreal Engine. Access requires proof of enrollment at a learning institution.

## Prepare Your Development Environment

Any operating system will do.[^1] Install the ruby development tools for your Operating System of choice.

On **Windows 10**, download and install:

- [Git from _git-scm.com/downloads_](https://git-scm.com/downloads).
- [Ruby from _rubyinstaller.org/downloads_ ](https://rubyinstaller.org/downloads/).

On **Debian**, run the following command as superuser:

```bash
apt install ruby2.3-dev git build-essential make gcc g++
```

On **MacOS**, do:

- Install developer tools: `xcode-select --install`
- Install homebrew:

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

- Install Ruby and Jekyll `brew install ruby`
- Apparently there are a few snags you can hit, but I can't verify these due to my lack of a Mac.

On **all operating systems**:  
Once you have installed git and ruby, you'll need to install a text editor and the required _ruby gems_, named bundler and jekyll. _Gem_ is the package manager for Ruby, and if you installed it in the steps above, it should now be available in your command line.

- [My favourite for beginners, due to simple integrated git controls, is _Atom_](https://atom.io/).
- Run `gem update`, followed by `gem install bundler` and `gem install jekyll`.
- Switching to Gem version 2.7.3 `gem update --system 2.7.3` may help if you encounter errors when installing bundler and jekyll.

![Development Environment](/legacy/JekyllDev.png)

## Create a Github Account

Again, students should create an accout with their [university email to take advantage of the Github Student Developer Pack.](https://education.github.com/pack).

Setting up **SSH keys** may seem like a complicated and unneccesary step now, but it'll save you from having to enter your password ten thousand times and is a worthwhile step to take.

In your home directory, run `ssh-keygen -t rsa -b 4096 -C "email@email.com"` (with your personal email,) on the command line or Git Bash on Windows. Keep hitting the _ENTER_ key to accept all of the default values. Copy the contents of the generated _id_pub.rsa_ to the _SSH and GPG keys_ section in your Github account settings. Now, when you push and pull to github, you won't need to enter a username and password.

Also run the following, in git bash (Windows,) or the command line:

```bash
git config --global user.name "First Last"
git config --global user.email "email@email.com"
git clone ssh://git@github.com/UserName/RepoName.git
```

A better guide for setting up these keys is available [here for troubleshooting.](http://inchoo.net/dev-talk/how-to-generate-ssh-keys-for-git-authorization/)

## Download Minima.zip

[Save it in your downloads, we'll be using it soon.](https://github.com/jekyll/minima)

![Web Building Art](/legacy/art/MakeAWebsite.png)

# Development

## Set Up Your Repository

The following steps, explained in detail below, will cover creating a repository, uploading the neccessary files, and viewing your new live site:

1. Create a new github repo yourname.github.io, and clone it to your machine.
2. Extract all (including hidden,) files from minima.zip to the cloned folder.
3. Push your changes to github and your site will automatically generate. _Done._

On _Github_, create a new repository named _yourname.github.io_, and set the .gitignore to _Jekyll_. A .gitignore, like the name suggests, ignores some files in your repository so unneccesary local scripts/configs/compiled files aren't shared between machines.

![Set Gitignore to Jekyll](/legacy/jekyllgitignore.png)

Now, _clone_ your new repository to your computer by navigating to your documents folder and running the command `git clone git@github.com:username/username.github.io.git`

Still have that Minima-master.zip? After ensuring your file manager is showing all hidden files, delete .gitignore from the minima folder, then copy the contents of the extracted minima folder to your site's repository.

To upload your changes, type `git add .` to let git know about the new files you want to include, then `git commit -m "Initial Minima upload."`, and finally `git push`. Your changes are now being uploaded to github, and your site should be available in short order.

**Check that your site has been compiled properly by checking Github:**

1. Click the _commits_ button to view the latest changes to the repository.  
   ![Development Environment](/legacy/seecommits.png)

2. You should be able to see a green checkmark next to the latest commit with a message that indicates success.  
   ![Development Environment](/legacy/compilecheck.png)

_If no message is present, you've done something wrong. Check the [troubleshooting guide]() at the end of this article._

## Customize: Style Your Site

In your `_assets` folder, a file named `main.scss` should exist.

From here, you can essentially take the mouse, point it at an object in developer mode to see the class of an item, then style the object with CSS. Below, in the left image, we can see that the section heading for _Posts_ has the class `h2.post-list-heading`. If we type the following, we can change the color of this item to red, and once we commit our changes, the site will appear as it does in the right image.

**main.scss**

```css
@import "minima";

.post-list-heading {
  color: red;
}
```

In the browser, using the inspector, we can see that _Posts_ is now red:

_Before the color change commit:_ ![Development Environment](/legacy/findelement.png) | _After the color change commit:_ ![Development Environment](/legacy/seechanges.png)

If you are familiar with CSS or SASS, this is your chance to let your creativity flow. You can style your whole site, or add SASS mixins', from this one file. I find that some changes don't propogate as readily, and rather than adding !important, I reccomend being more specific with the class/name of the targeted part first. If changes are not being applied, feel free to modify the scss in the `_sass` folder.

_To learn the very basics of CSS, I reccomend the interactive tutorial on Codecademy._

## Customize: Structure Your Site

Jekyll uses the _Liquid_ templating engine to process files in tandem with html in `_includes` and `_layouts`.

When your site is generated, it first looks through the root for **.md** files filled with content. The final output of each one of these files is a generated .html file. Naturally, the content of the first page users will see is contained in `index.md`.

Opening one of these .md files reveals a header, called **front matter,** with some variables set:

```gh-markdown
---
layout: news
title: News
permalink: /news/
---
```

_Layout_ allows you to choose which .html file in the `_layouts` folder is used to render the page. Files in this folder can also be nested inside a parent html file in the same way. Below, we can see the layout html for the markdown header shown above.

**news.html**

```html
---
layout: default
---
{%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}

<div class="card title">
  <h1>Ryan Fleck</h1>
</div>

<div class="card navigation">
  <h2>Navigation</h2>
  <ol>
    <li><a href="{{ site.url }}/experiments">Experiments</a></li>
    <li><a href="{{ site.url }}/discourse">Discourse</a></li>
    <li><a href="{{ site.url }}/tutorials">Tutorials</a></li>
    <li><a href="{{ site.url }}/archive">Archive</a></li>
</div>

{%- for post in site.posts -%}
<div class="card news">
  <h2><a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
  <span class="post-meta">{{ post.date | date: date_format }}</span>
  {{ post.excerpt }}
  <a class="readmore" href="{{ post.url | relative_url }}"><i>...read more.</i></a>
</div>
{%- endfor -%}
```

You'll notice that the html above contains for loops, relative links, and variables set. More about _Liquid Templating_ can be found [**here.**](https://jekyllrb.com/docs/templates/) Also note that `layout: default` is included at the top of the page; this prompts the engine to nest this piece of html inside the contents of `default.html`, shown below:

**default.html**

```html
<!DOCTYPE html>
<html lang="{{ page.lang | default: site.lang | default: "en" }}">

  {%- include head.html -%}

  <body>

    {%- include header.html -%}

    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        {{ content }}

      </div>
    </main>

    {%- include footer.html -%}

  </body>
</html>
```

## Important Things to Note

1. The html in `_layouts` are page layouts, and are typically nested inside `default.html`.
2. The html in `_includes` are snippets for globally shared parts like headers, decoration and tracking.
3. HTML in `_layouts` must include `{% raw %}{{ content }}{% endraw %}` where the child layout is to be inserted.

## Add Some JavaScript

Include a script at the end of your **default.html** like so:

```html
<script src="{{ site.baseurl }}/legacy/rcf.js"></script>
```

_...and have fun._ Here's what you'll see if you open the console of your browser _right now_.

<img src="/legacy/chrome_console.png" alt="Drawing" style="display:block; margin-left: auto; margin-right: auto; width: 505px; border-radius:0;"/>

Do remember that the more JavaScript you use to manipulate your site, apart from fun extras and experiments, the more prone it is to all sorts of failure. [The less you use, the better, and please for the love of whatever deity you pray to, don't implement some JavaScript frontend without a basic html/css failsafe.](https://hackernoon.com/the-javascript-phenomenon-is-a-mass-psychosis-57adebb09359)

## Recommended Tweaks

## Consistent Footnotes:

If sticking with the default minima font, Windows 10 will render the reverse-footnote ( ↩ ) wilh a strange, emoji-like character. To bypass this, change the site font, or add an exception for this element in `main.scss`:

```css
.reversefootnote,
.footnote {
  font-family: sans-serif;
}
```

## Take Control of the Navigation

To choose the specific appearance and order of pages in the navigation, modify the `_config.yml` file and uncomment the `header_pages:` line.

```yml
header_pages:
  # - about.md (Does not appear.)
  - experiments.md
  - discourse.md
  - tutorials.md
  - archive.md
```

# Utilize Your Creation

## Write Some Posts

Until this section is completed, please refer to the [official Kramdown tutorial.](https://kramdown.gettalong.org/quickref.html) The default _Rouge_ syntax highlighter supports a wide variety of languages. In most cases, using a language's common file extension will give good results, but for some (erlang, lisps,) it is better to refer to [this list](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers) of officially-supported languages.

## Google Analytics

Until this section is completed, please refer to [this blog post.](https://michaelsoolee.com/google-analytics-jekyll/)

## Share Your Site

If this is a showcase for personal projects, it's more important for the site to be _populated_ than _popular_. Still, if you're eager for the general public to read your work, consider linking to your own articles in forum discussions, or on various social media platforms.

## Troubleshooting

## Site Won't Build?

Check the repository settings for errors, and set the `minimal` theme, which is identical to Minima and will help fill in any gaps (where gaps are files that have not been included.)

## Time Test

Last update: {{ site.time | date_to_rfc822 }}

## FUBAR

If the site goes **FUBAR**, it's probably Windows line endings. Fix in GNU/Linux:

```bash
find ./ -type f -exec dos2unix {} \;
```

## Site Regenerates Slowly

You can utilize the following flags to limit the amount of processing that needs to be completed, and limit the number of posts the engine renders.

```
exec jekyll serve --drafts --watch --limit_posts 5 --incremental
```

<br />
<img src="/legacy/mnp/fire.gif" alt="Fire" style="display: block; margin-top: 20px; margin-bottom: 20px; margin-left: auto; margin-right: auto; border-radius:15px; width: 360px;"/>
<p style="text-align: center;">Hmmm, that didn't do it...</p>
<br />
<hr />
<br />
Well, if you've made it this far, you should have a fully functional website with a bit of content; the perfect place to showcase personal projects and musings. I hope that you've found this post useful. Please contact me with my current contact information, displayed in the site footer, if you have any questions about the article. For technical questions about Liquid, Jekyll, Kramdown or HTML/CSS, please consult google first, after which I'll be happy to help troubleshoot.

Thanks for reading,

<img src="/legacy/art/s.png" alt="RCF" style="border-radius:0; width: 289px;"/>

<br />
<br />

[^1]: **Operating System:** My personal favourite OS being **Debian.** I have a personal bias against development on Windows, but encountered no problems setting up git, ruby, and electron on a clean install. Most software is deployed on some sort of _GNU/Linux_ anyhow, so I feel development on this platform is best.s
[^2]: [**Jekyll**](https://jekyllrb.com/), a ruby-based static site generator (read: fast load times.)
[^3]: [**Kramdown**](https://kramdown.gettalong.org/), a markdown language with a few extra tricks.
[^4]: [**SASS**](https://sass-lang.com/), a CSS extension language, helps simplify sprawling stylesheets.
[^5]: [**Github Pages**](https://pages.github.com/), Github's initiative for developers to showcase their projects.

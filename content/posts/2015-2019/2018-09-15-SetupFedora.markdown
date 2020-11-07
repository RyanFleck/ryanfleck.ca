---
title: "Fedora 28 Setup Guide"
date: 2018-09-15 03:12:13
draft: true
---

When I sit down to write _anything_, I want to be using an Operating System that is stable, supports the tools I use, and maximizes the amount of time I spend being productive. This post is **WIP**.

I keep coming back to Fedora; the latest version is stable enough to rely on, with support for the latest packages. Previously I ran exclusively Debian after a long period of turmoil with Manjaro, Fedora, Ubuntu and many others. Debian is very reliable, but as I broaden my tinkering, it seemed more difficult than was warranted to keep all my tools up to date on Debian.

And so, I use Fedora. Here is how I configure my personal OS.

**Important:** I assume the reader is able to distinguish between commands that require SuperUser and commands that should be run without. Installing libraries or modules as a superuser in js, python and ruby will cause awful problems.

**Table of Contents:**

1. Seed list entry.
   {:toc}

<br />

## Baseline

### Install Fedora

1. Download a Fedora Workstation disk image.
1. Become superuser with `su` or `sudo su`
1. Check how to address your usb with `lsblk`
1. Unmount all USB partitions with `umount //dev/sdx*`
1. Format the USB drive with `mkfs.vfat //dev/sdx`
1. Write the downloaded image to the USB with `dd`
1. Install Fedora on your machine.

### Update Packages

Before continuing, it is best to update everything and reboot so the new kernel is used. First, configure dnf by adding the following lines to `//etc/dnf/dnf.conf` (you'll need to be SuperUser):

```bash
fastestmirror=true
deltarpm=true
```

Next, update the system with `dnf update --refresh`.

In the future, the following commands can be used to update and install packages:

```bash
# To gain SuperUser priviliges:
su

# To update the system's packages:
dnf update

# To install any package:
dnf install packagename

# To leave SuperUser mode:
exit
```

### Important Tweaks

1. **Set up the terminal** by installing the `terminus-fonts` and `terminus-fonts-console` packages, setting Terminus as the custom font, disabling scrollbars, disabling the terminal bell, hiding the menu bar by default, and setting the color scheme to white on black. Add terminal to your GNOME favourites.
1. **Swap the CapsLock key for an additional Esc;** it's far easier to hit Esc when it's right by your pinkie. Do this by installing `gnome-tweak-tool` and checking _make caps lock an additional esc_ in Keyboard and Mouse > Additional Layout Options. (I also set window focus to _Sloppy_ at this point, and enable the window minimize button.)
1. **Set the hostname:** as SuperUser: `hostnamectl set-hostname --static "newname"`

```
# Many popular packages are found in the RPMFusion repos,
# so it's a good idea to add them:
dnf install https://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
dnf install https://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm

```

<br />

## Install Development Tools

Install the major dependancies for most development:

```bash
dnf groupinstall "Development Tools"
```

### Version Control

**Git with SSH keys makes version control a breeze.** assuming all your projects are stored in GitHub repos, generating and storing an SSH key means you won't need to type your password with every push, as you would with simple HTTP authentication. First, generate the key; it is safe to accept all the defaults.

```sh
ssh-keygen -t rsa -b 4096 -C "email@email.com"
```

Assuming you have an ssh agent installed (most distros do by default,) add the key to your ssh service:

```bash
ssh-add ~/.ssh/id_rsa
```

Assuming Github is being used, the publickey located at `~/.ssh/id_rsa.pub` can be saved as a new SSH key in you Github account settings. To complete git setup, it is also necessary to set git defaults:

```bash
git config --global user.name "First Last"
git config --global user.email "email@email.com"
git config --global core.editor vim
```

Repositories can now be cloned like so:

```bash
git clone git@github.com:UserName/RepoName.git
```

### C and C++

Well, this is pretty easy on Unixlikes:

```bash
dnf install gcc gcc-c++
```

### Java

I typically program with Java 8, which is also a Scala dependancy:

```bash
dnf install java-1.8.0-openjdk-devel
```

### JavaScript

To install nodejs and npm:

```bash
dnf install nodejs
```

### Python

To install Python 3 and pip:

```bash
dnf install python3-devel
```

### Scala

For basic fiddling, install the basic scala repl:

```bash
dnf install scala
```

For larger projects, **SBT** is required:

```bash
curl https://bintray.com/sbt/rpm/rpm > bintray-sbt-rpm.repo
sudo mv bintray-sbt-rpm.repo /etc/yum.repos.d/
sudo dnf install sbt
```

### Ruby

Install ruby prerequisites:

```bash
dnf install git-core zlib zlib-devel gcc-c++ patch readline readline-devel libyaml-devel libffi-devel openssl-devel make bzip2 autoconf automake libtool bison curl sqlite-devel openssl-devel readline-devel zlib-devel
```

Install **RBENV** (**not** as SuperUser):

```bash
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL

rbenv install 2.4.2
gem install bundler
```

### LaTeX

<br />

## Configure Development Tools

### Vim

Write your vim config, `.vimrc`, to `~/.vimrc`.

```bash
syntax on
colorscheme ron
set tabstop=2
set shiftwidth=2
set softtabstop=0
set expandtab
set smarttab
set autoindent

nnoremap <F4> :! clear && gcc % && clear && ./a.out<cr>
```

```
dnf install gnome-terminal-nautilus
```

<br />

## Extras

### Google Chrome

```bash
dnf install fedora-workstation-repositories
dnf config-manager --set-enabled google-chrome
dnf install google-chrome-stable
```

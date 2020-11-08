---
title: "Semantic Release"
date: 2020-11-07T17:26:35-07:00
tags:
  - Programming
  - Python
  - Dev-Ops
---

Tagged releases with attached builds are great; especially when you don't need to tag, build, upload, and release it yourself. Enter _Semantic Release_, an _'aromantic'_ automated release system.

Working in the tech industry, you've probably heard of _semantic versioning_: the practice of marking releases with three numbers, separated by periods, denoting the major, minor, and patch version. The 'official' [semver](https://semver.org/) website has a detailed explanation, which relies on the technical language of the [RFC-2119](https://tools.ietf.org/html/rfc2119) versioning specification. Professionally, semantic versioning is used to ensure package managers can calculate an effective map of dependencies, ensuring breaking changes are not accidentally relied upon by any given program.

_Why release your own code automatically with semantic versioning?_ At this point in history, it's a best practice. At the very least, you'll have a nice version history and, on platforms like Github, a nice `.zip` of your code and a build at that point in time that you can archive. At best, it provides a very well-thought-out, clean mechanism for communicating how much your software has changed to those who rely on it.

On to the meat; how do I use _Semantic Release?_

If you're a _JavaScript_ user, you'll want to take a look at the [JavaScript implementation](https://semantic-release.gitbook.io/) of semantic release. As the projects I maintain are mostly written in Python, I opted for the [python implementation](https://python-semantic-release.readthedocs.io/) instead, as it would be easier to integrate with the Django projects and python libraries I maintain.

# Implementation

In the root of your repository, you ought to already have a `setup.cfg` file. If not, you can use [this Django app](https://github.com/Small-Minds/Democracy) for reference. Typically this python setup file contains config values for all tools used in the repository, like `mypy` or `flake8`. At the end of the file, add these lines:

```toml
# setup.cfg

[semantic_release]
# Replace 'democracy' with your application's package
version_variable = democracy/__init__.py:__version__
commit_author = "actions-user <actions@github.com>"
hvcs = github
# The build should not be made or uploaded anywhere:
build_command = echo 'Semantic release build step running.'
upload_to_pypi = False.
upload_to_release = False
# Change f*&%!*& branch to 'main' if needed.
branch = master
```

Within your package (the main folder of your python project,) in the directory's `__init__.py` file, add this line if it does not already exist:

```py
__version__ = "0.1.0"
```

Finally, you'll need to add a step to your CI. I'm using _Github Workflows_ today, but you can use anything that allows job dependencies and secrets storage. Add the following step to your workflow file, `ci.yml`:

```yaml
# ci.yml

name: CI

on: push

jobs:
  lint:
    # The rest of the linting job appears here.

  test:
    # The rest of the testing job appears here.

  semver:
    runs-on: ubuntu-latest
    needs: [test, lint]
    # Make sure to change this to f*&%*!*^ 'main' if needed.
    if: github.ref == 'refs/heads/master'

    env:
      # Add this to your secrets. Details below.
      GH_TOKEN: ${{ secrets.GH_TOKEN }}

    steps:
      - uses: actions/checkout@v2
        with:
          # Also modify this to f*&%*!*^ 'main' if needed.
          ref: "refs/heads/master"
          # A fetch depth of zero grabs all commits,
          # rather than just the most recent.
          fetch-depth: 0

      - name: Set up Python 3.8.*
        uses: actions/setup-python@v2
        with:
          python-version: 3.8.*

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install python_semantic_release

      - name: Configure Git
        run: |
          git config --global user.name "actions-user"
          git config --global user.email "actions@github.com"

      - name: Semantic Release Publish
        run: semantic-release publish -v DEBUG
```

The final configuration step is to add the `GH_TOKEN` secret to your repository. You'll be able to generate this at [github.com/settings/tokens](https://github.com/settings/tokens), and add it to your repositories secrets at _settings &rightarrow; secrets_.

**Congratulations!** You've set up semantic release on your repository. At this point, you'll be able to push and merge commits and pull requests with the following tags, and the semantic release program will check the commits for the most severe change, make a new release and tag, build a release, and add notes to your changelog. In your repository, the commit will look like this:

![Commit](/pics/semver/semver-bot-commit.png)

Your shiny new release, with changes and assets, will appear like so:

![Release](/pics/semver/semver-bot-release.png)

# Final Thoughts

Semantic release, when configured correctly, is an invaluable time-saving tool (as long as you name your commits and pull requests correctly!)

Here's a list of the tools and resources mentioned in this article:

1. [Semantic Release](https://semantic-release.gitbook.io/)
1. [Python Semantic Release](https://python-semantic-release.readthedocs.io/)
1. [Github Actions/Workflows](https://docs.github.com/en/free-pro-team@latest/actions)

And, as always, _thank you for reading!_

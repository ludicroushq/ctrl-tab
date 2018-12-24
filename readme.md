<h1 align="center">
  ctrl tab
  <p align="center">
    <a href="https://travis-ci.org/ludicrousxyz/ctrl-tab" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/travis/ludicrousxyz/ctrl-tab.svg" alt="build status">
    </a>
    <a href="https://chrome.google.com/webstore/detail/ctrl-tab/ijfnjhlohbehhlhhokgokabonpnlldon" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/chrome-web-store/v/ijfnjhlohbehhlhhokgokabonpnlldon.svg" alt="chrome web store version">
      <img src="https://img.shields.io/chrome-web-store/rating/ijfnjhlohbehhlhhokgokabonpnlldon.svg" alt="chrome web store rating">
    </a>
    <a href="https://addons.mozilla.org/en-US/firefox/addon/ctrl-tab" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/amo/v/ctrl-tab.svg" alt="firefox add-ons version">
      <img src="https://img.shields.io/amo/rating/ctrl-tab.svg" alt="firefox add-ons rating">
    </a>
  </p>
</h1>

ctrl tab is a new tab page that fetches news feeds that are relevant to you. choose from over 20 different data providers and customize the page how you want it.

## screenshot

![ctrl tab screenshot](https://raw.githubusercontent.com/ludicrousxyz/ctrl-tab/master/public/img/screenshot.png)

## contribute

1. clone the repository
2. install dependencies
```bash
npm install
```
3. run the webpack server (or build once if you aren't making any changes to the code)
```bash
npm run watch
# or if you aren't making any changes to the code
# npm run build
```
4. add the chrome extension by going to [chrome://extensions](chrome://extensions/), enabling developer mode, and pressing the load unpacked extension. select the `dist` directory in the folder

### server

all server related code is in the [ctrl-tab-api](https://github.com/ludicrousxyz/ctrl-tab-api) repository.

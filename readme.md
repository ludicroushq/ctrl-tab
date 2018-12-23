<h1 align="center">ctrl tab</h1>

<p align="center">
  <a href="https://travis-ci.org/ludicrousxyz/ctrltab" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/travis/ludicrousxyz/ctrltab.svg" alt="Build Status"></a>
</p>

ctrl tab is a chrome extension (support for other browsers coming soon) that fetches feeds from external sources including Reddit, Hacker News, GitHub, and Product Hunt (more providers coming soon).

## Screenshot

![ctrl tab screenshot](https://raw.githubusercontent.com/ludicrousxyz/ctrltab/master/public/img/screenshot.png)

## Contribute

1. Clone the repository
2. Install dependencies
```bash
npm install
```
3. Run the webpack server (or build once if you aren't making any changes to the code)
```bash
npm run watch
# or if you aren't making any changes to the code
# npm run build 
```
4. Add the chrome extension by going to [chrome://extensions](chrome://extensions/), enabling developer mode, and pressing the load unpacked extension. Select the `dist` directory in the folder

### Server

All server related code is in the [ctrltab-api](https://github.com/ludicrousxyz/ctrltab-api) repository.

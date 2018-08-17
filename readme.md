# Ludicrous Tab (Work in Progress)

Ludicrous Tab is a chrome extension (support for other browsers coming soon) that fetches feeds from external sources including Reddit, Hacker News, GitHub, and Product Hunt (more providers coming soon).

## Screenshot
Coming soon

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
4. Add the chrome extension by going to [chrome://extensions/](chrome://extensions/), enabling developer mode, and pressing the load unpacked extension. Select the `dist` directory in the folder

### Server
All server related code is in the [tab.api](https://github.com/ludicrousxyz/tab.api) repository.
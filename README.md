# Bus Karo - Online Bus Services

```
https://<domainname>.com/
Version - 1.0.0
Team - Abhay Rohit, Harsh Dangi, Pradhyumn Upadhyay, Rupesh Vaishnav, Sanjay Kumar
Author - Haspr, contact@haspr.in
Licence - Copyright (c) 2021, Haspr. All rights reserved.
```

## Quick Setup

### Prerequisite

Install Node.js 12 or Above (https://nodejs.org/en/)

Install Yarn Package Manager (https://classic.yarnpkg.com/lang/en/docs/install/)

### Install Packages

```
yarn
```

### Production

Build an optimized version of app in `/out/`:

```
yarn build
```

### Development

Deploy app and start Webpack 5 Server:

```
yarn dev
```

### Develop on Custom Port

```
PORT=1234 yarn dev
```

### File structure

```bash

├── /node_modules/              # NodeJS Packages
├── /src/                       # Source Code
    ├── components              # Function Display Components
    ├── utilities               # Utility & Helper Functions
├── /pages/                     # Deployment Routes and Pages
    ├── _app.js                 # Default App Entry Point
    ├── _offline.js             # Fallback page if Offline
    ├── 404.js                  # 404 Website Error Page
    ├── 500.js                  # 500  Server Error Page
    ├── index.js                # App code goes here
├── /out/                       # Production directory
└── /public/                    # Static Public Directory
    ├── /icons/                 # SVG and other icons
    ├── /locales/               # JSON localizations strings
    ├── /static/                # Static files (fonts, images, videos, etc..)
├── /styles/                    # SCSS styles
├── .env                        # Environment variables
├── .gitignore                  # Ignored Files for Github
├── .README.md                  # Instructions
├── package.json                # Project meta and dependencies
├── next.config.js              # Next JS Configuration
├── yarn.lock                   # Yarn Lockfile

```

## Packages used

### Front-end dependencies

Framer Motion (https://www.framer.com/motion/)

Smooth Scrollbar (https://idiotwu.github.io/smooth-scrollbar/)

Sass (https://sass-lang.com/)

### Core dependencies

NextJS 11 (https://nextjs.org/)

ReactJS (https://reactjs.org/)

ReactDOM (https://reactjs.org/docs/react-dom.html)

Next PWA (https://github.com/shadowwalker/next-pwa)

## Advanced configuration

### Languages

All locales should be stored in `./src/locales/{LANG}/*.json`.

### Styles

Style Library Used [Sass preprocessor](https://sass-lang.com/).

By default entrypoint is `./src/scss/main.scss`.

### JS

All javascript proceed with [webpack](https://webpack.js.org/) + [Babel](https://babeljs.io/).

```

Webpack config is stored in `.next.config.js`.

By default entrypoint is `pages/_app.js`.

```

[Read webpack docs](https://webpack.js.org/concepts/).

[Read Babel docs](https://babeljs.io/docs/en/).

To build project and start local web server use:

```

yarn start

```

To start only server, without build project, use:

```

yarn dev

```

## Tutorials

### Nothing Yet

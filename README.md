<h1 align="center">
  <img src="https://cl.ly/b07573d3b06a/%255Bc0c78436c1ec97427213778206bdf7dc%255D_logo.png" alt="My Todos" />
</h1>

<h2 align="center">
  <img src="https://cl.ly/71bbfc1d023c/%255B4464c8994b603a5f10feaca706bca221%255D_md-subtitle.png" alt="MyTodos Tagline" />
</h2>

<h6 align="center">
  (aka todo-app-giant)
</h6>

<p align="center">
  <a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fnypinstripes%2Ftodo-app-giant&via=nypinstripes&text=MyTodos%20A%20-%20Simple%20React%20Todo%20App%20&hashtags=todos%20%23react%20%23interview" rel="noopener noreferrer">
    <img src="https://cl.ly/ba452d5610b9/tweet-shields.svg" alt="Tweet MyTodos" />
  </a>
  <img src="https://cl.ly/480d790a560b/prs-welcome.svg" alt="Open MyTodos" />
</p>

<h2></h2>

1. [Setting up MyTodos](#setting-up-mytodos)
1. [Application Architecture](#application-architecture)
1. [Pages & Previews](#pages-&-previews)
1. [Todos](#todos)


<a name="setting-up-mytodos"></a>
## Setting up MyTodos

### Prerequisites

You will need the following things properly installed on your computer.
* [Homebrew](https://github.com/Homebrew/brew)
&nbsp;(or compatible Node installing package manager, mac-ports?)

* [Node.js](http://nodejs.org/) (with Yarn or NPM)

#### Step 1: Check your node version & upgrade if needed.

```bash
$ node -v
v8.0.0 # if you see this or higher, you're good!
```

If not:

```bash
$ brew update
$ brew upgrade node
```

#### Step 2: Clone the "MyTodos" (todo-app-giant) repo & cd into the directory.

```bash
$ git clone git@github.com:nypinstripes/todo-app-giant.git
$ cd stash-search
```

#### Step 3: Install App Dependencies with yarn or npm.
The app was initialized & built using [Yarn](https://yarnpkg.com/en/), however it has been tested & confirmed to work with npm.

```bash
$ yarn install
```

or

```bash
$ npm install
```

#### Step 4: Build & Start the App (in Production Mode)
Individual build (dev/prod), test & server start commands can be found in the `scripts` hash in <a href="/package.json" rel="noopenner noreferrer">package.json</a>.

```bash
$ yarn launch
```

or

```bash
$ npm start
```

#### Step 5: Running Tests
There are a few ways to run the MyTodos test suite. Presently, only tests for renderring routes & persistant layout elements.

* `yarn/npm test` to execute the test suite in single run mode & generate Jest snapshots.
* `yarn/npm test:update` to execute the test suite in single run mode & update Jest snapshots that have changed.
* `yarn/npm test:watch` to execute the test suite in constant watch mode & update Jest snapshots as they're changed.
* `yarn/npm test:coverage` to view code coverage (lcov) & render performance reports using the built-in react tool (formerly Istanbul).

<h2></h2>

<a name="application-architecture"></a>
## Application Architecture

#### Web Backend

##### NodeJS
The runtime environment (rte) is <a href="https://nodejs.org" rel="noopener noreferrer">NodeJS</a> and was written on v11.2.0, however it should be able to run without issue on any NodeJS version higher than 8.0.0.

##### Express
The webserver is <a href="https://expressjs.com/" rel="noopener noreferrer">ExpressJS</a> as it continues to be the more popular of the choices for running web backends on Node, Hapi would be a suitable alternative.

##### Pug
The server-side markup is renderred using the PUG templating engine, which has a high degree of reliability with build tools like <a href="http://webpackjs.org" rel="noopener noreferrer">Webpack</a>.

##### UAParser
As a simple alternative to polyfilling with a library like modernizr, there's also a JS library I used called UAParserJS, which detects & extracts loads of useful info about the client machine upon the first request. With this info we can look at things like the client's user-agent to determine if their browser is among the ones that are supported.

The list of supported browsers can be found in the server helper utils file under <a href="/server/utils/helper-utils.js" rel="noopener noreferrer">agents</a>.

In addition to helper functions, <a href="https://github.com/faisalman/ua-parser-js" rel="noopener noreferrer">UAParserJS</a> also offers fine-grain access to:

```
ua,
browser: { name, version },
engine: { name, version },
os: { name, version },
device: { model, type, vendor },
cpu: { architecture }
```

### Build & Transpiler Tools

- [Webpack 4](https://webpack.js.org)

- [Babel 7](https://babeljs.io)

### Frontend Application

##### React/Redux

###### Component Architecture

<p align="left">
  <img src="https://cl.ly/d3846b8d97d7/components.png" alt="jsx structures" />
</p>

##### Sass (SCSS syntax)

###### The 7-1 Pattern

- [The 7-1 Pattern](https://sass-guidelin.es/#the-7-1-pattern)
- [Aesthetic Sass 1: Architecture and Style Organization](https://scotch.io/tutorials/aesthetic-sass-1-architecture-and-style-organization)

<p align="left">
  <img src="https://cl.ly/4f15fac3e484/scss.png" alt="scss structures" />
</p>

_App Styles_

Folder           | Description
---------------- | -----------
`/base/..`       | Styles applicable globally, throughout the app, like browser resets/normalize files.
`/common/..`     | Styles for visual elements with specific classes, but do not have components attached to them (e.g., `.overlays`, `.animations`). Files should be separated by their purpose.
`/components/..` | Styles applicable to individual components (these files are appended near the end and are overridden only by vendor styles).
`/layout/..`     | Styles for standard elements that are *persistent* throughout the experience & on every page. Files should be separated by elements.
`/vendor/..`     | Styles for elements that are particular to 3rd party plugin libraries and secondary browser type & version support. These styles load last and have the highest precedence.

_Shared Sass Helpers_ `/shared/data` `/shared/scss`

Folder           | Description
---------------- | -----------
`_breakpoints`   | Definition of app wide media query breakpoint rules, logic & utility.
`_colors`        | All colors should be html named colors which can be found at [Color Names](https://htmlcolorcodes.com/color-names/) or predefined named variables sourced from the [sip](https://sipapp.io/) or [swatches](https://swatchesapp.io) OSX apps, or similar interface (based on Chirag Mehta's famous "name that color" tool), or from formal design guides except those inherent to browsers [W3 Color Names](http://www.w3schools.com/colors/colors_names.asp), which will not appear in this list. Please keep them alpha sorted, use all lower-case dasherized variable names.
`_functions`     | Sass helper functions - Things like custom short hand utilities for fonts, colors, borders etc.
`_mixins`        | Sass mixins

###### Vendor Libraries

- [Bourbon Sass](https://www.bourbon.io/docs/latest/)

- [Breakpoint Sass](http://breakpoint-sass.com/)

###### Naming Colors Resources

- [Swatches](https://swatchesapp.io)

- [Sip](https://sipapp.io/)

- [Colblindor](https://www.color-blindness.com/color-name-hue/)

- [Name That Color](http://chir.ag/projects/name-that-color/#6195ED)

##### Testing with Jest

<p align="left">
  <img src="https://cl.ly/1d186b2c73f6/Screen%252520Shot%2525202019-01-22%252520at%2525208.58.53%252520AM.png" alt="jest structures" />
</p>

_Snapshots are generated using the jest testing library, at present there are only basic Route/Layout load & render tests in the suite._

<h2></h2>

<a name="pages-&-previews"></a>
## Pages & Previews

### Previews

#### Todos

<p align="center">
  <img width="100%" valign="top" src="https://cl.ly/02b84a1b6bd2/Screen%252520Recording%2525202019-01-22%252520at%25252008.04%252520AM.gif" alt="404" />
</p>

### Pages

##### &nbsp;&nbsp;&nbsp;404

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/c9ffa315ccf6/Screen%252520Recording%2525202019-01-22%252520at%25252008.06%252520AM.gif" alt="404" />
</p>

##### &nbsp;&nbsp;&nbsp;All

<p align="left">
  <img width="33%" valign="top" src="https://cl.ly/1ec568f2e506/all-mobile.png" />
  <img width="66%" valign="top" src="https://cl.ly/f82ea1ee87bc/all.png" />
</p>

##### &nbsp;&nbsp;&nbsp;Active

<p align="left">
  <img width="33%" valign="top" src="https://cl.ly/de1ab4fce577/active-mobile.png" />
  <img width="66%" valign="top" src="https://cl.ly/8eb8ede8737f/active.png" />
</p>


##### &nbsp;&nbsp;&nbsp;Completed

<p align="left">
  <img width="33%" valign="top" src="https://cl.ly/eed309db20b2/%255B9057039525aed3b6f7c330cafc696deb%255D_completed-mobile.png" />
  <img width="66%" valign="top" src="https://cl.ly/c6a39a3f776a/completed.png" />
</p>

##### &nbsp;&nbsp;&nbsp;Archived

<p align="left">
  <img width="33%" valign="top" src="https://cl.ly/c0756cbd72cd/archived-mobile.png" />
  <img width="66%" valign="top" src="https://cl.ly/4c8719d0b510/%255B5bb282b8ee68bfcc2c7df03c31c058d0%255D_archived.png" />
</p>

##### &nbsp;&nbsp;&nbsp;Unsupported Browsers

<p align="left">
  <img width="100%" valign="top" src="https://cl.ly/aa1f17e9e4b2/%255B807d61821aff687975b7e920ae1ce28a%255D_unsupported.png" alt="unsupported" />
</p>


<h2></h2>

<a name="todos"></a>
## TODOs

- [ ] Add an individual todo detail view.
- [ ] Make Todos editable.
- [ ] Add tap, touch & swipe controls for mobile devices.
- [ ] Add more tests & increase coverage & reliability.
- [ ] Performance (loading, updating & painting) audit, with network optimized media sizes.
- [ ] More inline Documentation!!
- [ ] Perform more x-browser/device/OS UI/UX sanity/QA checking (currently only verified with Chrome).
- [ ] Make use of some of the deeper webpack optimization features like Tree-Shaking, CommonsChunking.
- [ ] Attempt lazy component loading with System.import();

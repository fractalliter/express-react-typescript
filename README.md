# express-react-typescript

A boilerplate to build web application using Express and React with help of Typescript. It's configured to separate client-side JavaScript and CSS bundles and your files as assets.

- [express-react-typescript](#Express-React-Boilerplate)
  - [Introduction](#introduction)
    - [Development mode](#development-mode)
    - [Production mode](#production-mode)
  - [Quick Start](#quick-start)
  - [Documentation](#documentation)
    - [Directory Structure](#directory-structure)
    - [Babel](#babel)
    - [Typescript](#typescript)
    - [Less](#less)
    - [ESLint](#eslint)
    - [Webpack](#webpack)
    - [Webpack dev server](#webpack-dev-server)
    - [Nodemon](#nodemon)
    - [Express](#express)
    - [Concurrently](#concurrently)
    - [VSCode + ESLint + Prettier](#vscode--eslint--prettier)
      - [Installation guide](#installation-guide)

## Introduction

It's a really well-configured approach for building applications with full-stack Typescript. It's configured for Back-end development with using MongoDB as Database, ExpressJS framework for web services and Front-end development using ReactJS library with help of Typescript language and Less preprocessor for stylesheets.

## prerequisite

-First make sure that you have a MongoDB database installed somewhere and change the configurations in `src/server/configs.ts` file. the default is localhost.

### Development mode

In the development mode, you will have a back-end server running with [nodemon](https://nodemon.io/) and a Front-end server running with the [webpack dev server](https://webpack.js.org/configuration/dev-server/). The [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading for Front-end. The server-side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server-side code changes.

### Production mode

In the production mode, you will have only the Back-end code in server directory. Webpack will load Typescript and Less into separate directories for JavaScript and CSS bundles.
Separating JavaScript from CSS helps browsers for caching CSS files.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Fractalliter/express-react-typescript <app-name>

#Attention please: change the <app-name> with your prefered name for your app

# Go inside the directory
cd <app-name>

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

If you are looking for typeless and pure css you can find it [here](https://github.com/crsandeep/simple-react-full-stack)
 
## Documentation

### Directory Structure

Source code for Back-end and Front-end will be placed at src directory. Server directory is for web services and Client is for UI source codes in development mood. For production mood, Webpack bundles everything inside the client directory and all the assets files at assets into the dist directory.

### Typescript

[Typescript](https://www.typescriptlang.org) is a typed superset for Javascript that compiles to plain JavaScript. It's only for preventing miss-typing in development mood. In production mood it's just plain JavaScript.

### Less

[Less](http://lesscss.org/) is a backwards-compatible language extension for CSS. Less helps to write CSS in a functional way and It's really easy to read and understand.

### ESLint

[ESLint](https://eslint.org/) is a pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript and Typescript.

[.eslintrc.json file](<(https://eslint.org/docs/user-guide/configuring)>) (alternatively configurations can be written in Javascript or YAML as well) is used describe the configurations required for ESLint. Below is the .eslintrc.json file which has been used.

```javascript
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```

[Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript) which has been used by the majority of JavaScript and Typescript developers worldwide. Since the aim is support for both client (browser) and server side (Node.js) source code, the **env** has been set to browser and node. 
Optionally, you can override the current settings by installing `eslint` globally and running `eslint --init` to change the configurations to suit your needs. [**no-console**](https://eslint.org/docs/rules/no-console), [**comma-dangle**](https://eslint.org/docs/rules/comma-dangle) and [**react/jsx-filename-extension**](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) rules have been turned off.

### Webpack

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to capable Front-end developers to experience a modular programming style and bundle JavaScript and CSS files for usage in a browser.

[webpack.config.js](https://webpack.js.org/configuration/) file has been used to describe the configurations required for webpack. Below is the webpack.config.js file which has been used.

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: ['babel-polyfill', './src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: './js/[name].bundle.js'
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.tsx?$/,
        use:[
          {
            loader: "awesome-typescript-loader"
          },
        ],
        exclude: /node_modules/
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './Less',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            }
          },
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.less']
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8050'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
      title: "Book Manager",
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[id].css',
    }),
    new CopyPlugin([
      { from: './src/client/Assets', to: 'assets' },
    ])
  ],
};

```

1.  **entry:** entry: ./src/client/index.tsx is where the application starts executing and Webpack starts bundling.
    Note: babel-polyfill is added to support async/await. Read more [here](https://babeljs.io/docs/en/babel-polyfill#usage-in-node-browserify-webpack).
2.  **output path and filename:** the target directory and the filename for the bundled output.
3.  **module loaders:** Module loaders are transformations that are applied on the source code of a module. We pass all the js file through [babel-loader](https://github.com/babel/babel-loader) to transform JSX to Javascript. CSS files are passed through [css-loaders](https://github.com/webpack-contrib/css-loader) and [style-loaders](https://github.com/webpack-contrib/style-loader) to load and bundle CSS files. Fonts and images are loaded through url-loader.
4.  **Dev Server:** Configurations for the webpack-dev-server which will be described in coming section.
5.  **plugins:** [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) is a webpack plugin to remove the build directory before building. [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) simplifies creation of HTML files to serve your webpack bundles. It loads the template (public/index.html) and injects the output bundle.

### Webpack dev server

[Webpack dev server](https://webpack.js.org/configuration/dev-server/) is used along with webpack. It provides a development server that enables live reloading for the client side code changes.

The devServer section of webpack.config.js contains the configuration required to run webpack-dev-server which is given below.

```javascript
devServer: {
    port: 3000,
    open: true,
    proxy: {
        "/api": "http://localhost:8050"
    }
}
```

[**Port**](https://webpack.js.org/configuration/dev-server/#devserver-port) specifies the Webpack dev server to listen on this particular port (3000 in this case). When [**open**](https://webpack.js.org/configuration/dev-server/#devserver-open) is set to true, it will automatically open the home page on start-up. [Proxying](https://webpack.js.org/configuration/dev-server/#devserver-proxy) URLs can be useful when you have a separate API backend development server, and you want to send API requests on the same domain.

### Nodemon

Nodemon is a utility monitors for any changes in the server-side source code, and automatically restarts the server. Nodemon is just for development purposes only.
**nodemon.json** file is used to hold the configurations for Nodemon.

### Express

Express is a web application framework for Node.js. It is used to build our backend API's.

**src/server/index.ts** is the entry point to the server application which starts a server and listens on port 8085 for connections. The app responds with `{username: <username>}` for requests to the URL (/api/test). It is also configured to serve the static files from **dist** directory.

### Concurrently

[Concurrently](https://github.com/kimmobrunfeldt/concurrently) is used to run multiple commands concurrently. I's been used to run the webpack dev server and the backend node server concurrently in the development environment. Below are the npm/yarn script commands used.

```javascript
"scripts": {
    "build": "webpack --mode production",
    "start": "npm run build && npm run server",
    "client": "webpack-dev-server --mode development --devtool inline-source-map --hot",
    "server": "tsc -p tsconfig.server.json && node server/",
    "dev": "concurrently \"nodemon\" \"npm run client\"",
    "server-dev": "nodemon"
  },
```

### VSCode + ESLint + Prettier

[VSCode](https://code.visualstudio.com/) is a lightweight but powerful source code editor. [ESLint](https://eslint.org/) takes care of the code-quality. [Prettier](https://prettier.io/) takes care of all the formatting.

#### Installation guide

1.  Install [VSCode](https://code.visualstudio.com/)
2.  Install [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3.  Install [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
4.  Modify the VSCode user settings to add below configuration

    ```javascript
    "eslint.alwaysShowStatus": true,
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": true,
    "prettier.eslintIntegration": true
    ```

This can be configured at the project level by following [this article](https://medium.com/@netczuk/your-last-eslint-config-9e35bace2f99).

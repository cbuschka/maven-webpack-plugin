# maven-webpack-plugin

[![Build Status](https://travis-ci.org/cbuschka/maven-webpack-plugin.svg?branch=master)](https://travis-ci.org/cbuschka/maven-webpack-plugin)
[![npm version](https://badge.fury.io/js/maven-webpack-plugin.svg)](https://badge.fury.io/js/maven-webpack-plugin)
[![downloads](https://img.shields.io/npm/dm/maven-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/maven-webpack-plugin)

### A [webpack](https://webpack.js.org/) plugin that calls [maven](https://maven.apache.org/) (the Java build tool) to extract ${project.version}.

## Requirements
- **webpack >= 4**

## Installation

For npm:

```bash
npm install --save-dev maven-webpack-plugin
```

For yarn;

```bash
yarn add -D maven-webpack-plugin
```

## Usage

Load the plugin in your webpack config:

```javascript
const MavenWebpackPlugin = require('maven-webpack-plugin')

module.exports = {
  plugins: [
    new MavenWebpackPlugin()
  ]
}
```

The plugin replaces `[maven-project-version]` with the ${project.version} from pom.xml.

Example:

```javascript
module.exports = {
  output: {
    publicPath: 'http://example.com/[maven-project-version]/',
    filename: '[name]-[maven-project-version].js'
  }
}
```

## Plugin API

The ${project.version} is exposed via public API.

Example using the [DefinePlugin](https://webpack.js.org/plugins/define-plugin/#usage):

```javascript
const webpack = require('webpack')
const MavenWebpackPlugin = require('maven-webpack-plugin')
const mavenWebpackPlugin = new MavenWebpackPlugin()

module.exports = {
  plugins: [
    mavenWebpackPlugin,
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(mavenWebpackPlugin.projectVersion())
    })
  ]
}
```

## License
Copyright (c) 2019 by [Cornelius Buschka](https://github.com/cbuschka).

[Apache License, Version 2.0](license)

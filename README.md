[![status: experimental](https://github.com/GIScience/badges/raw/master/status/experimental.svg)](https://github.com/GIScience/badges#experimental)

Why is it experimental?
It not yet fully supports all response types that the [ohsome API](https://api.ohsome.org/v1/swagger-ui.html) can return. 
So currently it mainly supports the functionality needed in the [ohsome Dashboard](https://dashboard.ohsome.org) app.

# Info
This library contains JavaScript functions to help clients to use the Ohsome-Api for analyzing historical OpenStreetMap data. 

Functionality includes 

+ parsing and validation of request params
+ type-guards, functions to access result values, conversion functions to create CSV output from JSON results

# Usage

## Installation
```shell
$> npm install @giscience/ohsome-js-utils
```

You can use this library in different ways.

## 1. UMD single file bundle for browsers or nodejs scripts
```html
<script src="dist/ohsome-js-utils.umd.min.js"></script>
```
```javascript
// nodejs
var OhsomeJsUtils = require( '@giscience/ohsome-js-utils' );
```

## 2. ES2020 modules
```javascript
import * as OhsomeJsUtils from '@giscience/ohsome-js-utils'
// or
import { OhsomeApi } from '@giscience/ohsome-js-utils'
```

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "assets/scripts/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar token = '%[a-f0-9]{2}';\nvar singleMatcher = new RegExp(token, 'gi');\nvar multiMatcher = new RegExp('(' + token + ')+', 'gi');\n\nfunction decodeComponents(components, split) {\n\ttry {\n\t\t// Try to decode the entire string first\n\t\treturn decodeURIComponent(components.join(''));\n\t} catch (err) {\n\t\t// Do nothing\n\t}\n\n\tif (components.length === 1) {\n\t\treturn components;\n\t}\n\n\tsplit = split || 1;\n\n\t// Split the array in 2 parts\n\tvar left = components.slice(0, split);\n\tvar right = components.slice(split);\n\n\treturn Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));\n}\n\nfunction decode(input) {\n\ttry {\n\t\treturn decodeURIComponent(input);\n\t} catch (err) {\n\t\tvar tokens = input.match(singleMatcher);\n\n\t\tfor (var i = 1; i < tokens.length; i++) {\n\t\t\tinput = decodeComponents(tokens, i).join('');\n\n\t\t\ttokens = input.match(singleMatcher);\n\t\t}\n\n\t\treturn input;\n\t}\n}\n\nfunction customDecodeURIComponent(input) {\n\t// Keep track of all the replacements and prefill the map with the `BOM`\n\tvar replaceMap = {\n\t\t'%FE%FF': '\\uFFFD\\uFFFD',\n\t\t'%FF%FE': '\\uFFFD\\uFFFD'\n\t};\n\n\tvar match = multiMatcher.exec(input);\n\twhile (match) {\n\t\ttry {\n\t\t\t// Decode as big chunks as possible\n\t\t\treplaceMap[match[0]] = decodeURIComponent(match[0]);\n\t\t} catch (err) {\n\t\t\tvar result = decode(match[0]);\n\n\t\t\tif (result !== match[0]) {\n\t\t\t\treplaceMap[match[0]] = result;\n\t\t\t}\n\t\t}\n\n\t\tmatch = multiMatcher.exec(input);\n\t}\n\n\t// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else\n\treplaceMap['%C2'] = '\\uFFFD';\n\n\tvar entries = Object.keys(replaceMap);\n\n\tfor (var i = 0; i < entries.length; i++) {\n\t\t// Replace all decoded components\n\t\tvar key = entries[i];\n\t\tinput = input.replace(new RegExp(key, 'g'), replaceMap[key]);\n\t}\n\n\treturn input;\n}\n\nmodule.exports = function (encodedURI) {\n\tif (typeof encodedURI !== 'string') {\n\t\tthrow new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');\n\t}\n\n\ttry {\n\t\tencodedURI = encodedURI.replace(/\\+/g, ' ');\n\n\t\t// Try the built in decoder first\n\t\treturn decodeURIComponent(encodedURI);\n\t} catch (err) {\n\t\t// Fallback to a more advanced decoder\n\t\treturn customDecodeURIComponent(encodedURI);\n\t}\n};\n\n\n//# sourceURL=webpack:///./node_modules/decode-uri-component/index.js?");

/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nconst strictUriEncode = __webpack_require__(/*! strict-uri-encode */ \"./node_modules/strict-uri-encode/index.js\");\nconst decodeComponent = __webpack_require__(/*! decode-uri-component */ \"./node_modules/decode-uri-component/index.js\");\nconst splitOnFirst = __webpack_require__(/*! split-on-first */ \"./node_modules/split-on-first/index.js\");\n\nconst isNullOrUndefined = value => value === null || value === undefined;\n\nfunction encoderForArrayFormat(options) {\n\tswitch (options.arrayFormat) {\n\t\tcase 'index':\n\t\t\treturn key => (result, value) => {\n\t\t\t\tconst index = result.length;\n\n\t\t\t\tif (\n\t\t\t\t\tvalue === undefined ||\n\t\t\t\t\t(options.skipNull && value === null) ||\n\t\t\t\t\t(options.skipEmptyString && value === '')\n\t\t\t\t) {\n\t\t\t\t\treturn result;\n\t\t\t\t}\n\n\t\t\t\tif (value === null) {\n\t\t\t\t\treturn [...result, [encode(key, options), '[', index, ']'].join('')];\n\t\t\t\t}\n\n\t\t\t\treturn [\n\t\t\t\t\t...result,\n\t\t\t\t\t[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')\n\t\t\t\t];\n\t\t\t};\n\n\t\tcase 'bracket':\n\t\t\treturn key => (result, value) => {\n\t\t\t\tif (\n\t\t\t\t\tvalue === undefined ||\n\t\t\t\t\t(options.skipNull && value === null) ||\n\t\t\t\t\t(options.skipEmptyString && value === '')\n\t\t\t\t) {\n\t\t\t\t\treturn result;\n\t\t\t\t}\n\n\t\t\t\tif (value === null) {\n\t\t\t\t\treturn [...result, [encode(key, options), '[]'].join('')];\n\t\t\t\t}\n\n\t\t\t\treturn [...result, [encode(key, options), '[]=', encode(value, options)].join('')];\n\t\t\t};\n\n\t\tcase 'comma':\n\t\tcase 'separator':\n\t\t\treturn key => (result, value) => {\n\t\t\t\tif (value === null || value === undefined || value.length === 0) {\n\t\t\t\t\treturn result;\n\t\t\t\t}\n\n\t\t\t\tif (result.length === 0) {\n\t\t\t\t\treturn [[encode(key, options), '=', encode(value, options)].join('')];\n\t\t\t\t}\n\n\t\t\t\treturn [[result, encode(value, options)].join(options.arrayFormatSeparator)];\n\t\t\t};\n\n\t\tdefault:\n\t\t\treturn key => (result, value) => {\n\t\t\t\tif (\n\t\t\t\t\tvalue === undefined ||\n\t\t\t\t\t(options.skipNull && value === null) ||\n\t\t\t\t\t(options.skipEmptyString && value === '')\n\t\t\t\t) {\n\t\t\t\t\treturn result;\n\t\t\t\t}\n\n\t\t\t\tif (value === null) {\n\t\t\t\t\treturn [...result, encode(key, options)];\n\t\t\t\t}\n\n\t\t\t\treturn [...result, [encode(key, options), '=', encode(value, options)].join('')];\n\t\t\t};\n\t}\n}\n\nfunction parserForArrayFormat(options) {\n\tlet result;\n\n\tswitch (options.arrayFormat) {\n\t\tcase 'index':\n\t\t\treturn (key, value, accumulator) => {\n\t\t\t\tresult = /\\[(\\d*)\\]$/.exec(key);\n\n\t\t\t\tkey = key.replace(/\\[\\d*\\]$/, '');\n\n\t\t\t\tif (!result) {\n\t\t\t\t\taccumulator[key] = value;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (accumulator[key] === undefined) {\n\t\t\t\t\taccumulator[key] = {};\n\t\t\t\t}\n\n\t\t\t\taccumulator[key][result[1]] = value;\n\t\t\t};\n\n\t\tcase 'bracket':\n\t\t\treturn (key, value, accumulator) => {\n\t\t\t\tresult = /(\\[\\])$/.exec(key);\n\t\t\t\tkey = key.replace(/\\[\\]$/, '');\n\n\t\t\t\tif (!result) {\n\t\t\t\t\taccumulator[key] = value;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\tif (accumulator[key] === undefined) {\n\t\t\t\t\taccumulator[key] = [value];\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\taccumulator[key] = [].concat(accumulator[key], value);\n\t\t\t};\n\n\t\tcase 'comma':\n\t\tcase 'separator':\n\t\t\treturn (key, value, accumulator) => {\n\t\t\t\tconst isArray = typeof value === 'string' && value.split('').indexOf(options.arrayFormatSeparator) > -1;\n\t\t\t\tconst newValue = isArray ? value.split(options.arrayFormatSeparator).map(item => decode(item, options)) : value === null ? value : decode(value, options);\n\t\t\t\taccumulator[key] = newValue;\n\t\t\t};\n\n\t\tdefault:\n\t\t\treturn (key, value, accumulator) => {\n\t\t\t\tif (accumulator[key] === undefined) {\n\t\t\t\t\taccumulator[key] = value;\n\t\t\t\t\treturn;\n\t\t\t\t}\n\n\t\t\t\taccumulator[key] = [].concat(accumulator[key], value);\n\t\t\t};\n\t}\n}\n\nfunction validateArrayFormatSeparator(value) {\n\tif (typeof value !== 'string' || value.length !== 1) {\n\t\tthrow new TypeError('arrayFormatSeparator must be single character string');\n\t}\n}\n\nfunction encode(value, options) {\n\tif (options.encode) {\n\t\treturn options.strict ? strictUriEncode(value) : encodeURIComponent(value);\n\t}\n\n\treturn value;\n}\n\nfunction decode(value, options) {\n\tif (options.decode) {\n\t\treturn decodeComponent(value);\n\t}\n\n\treturn value;\n}\n\nfunction keysSorter(input) {\n\tif (Array.isArray(input)) {\n\t\treturn input.sort();\n\t}\n\n\tif (typeof input === 'object') {\n\t\treturn keysSorter(Object.keys(input))\n\t\t\t.sort((a, b) => Number(a) - Number(b))\n\t\t\t.map(key => input[key]);\n\t}\n\n\treturn input;\n}\n\nfunction removeHash(input) {\n\tconst hashStart = input.indexOf('#');\n\tif (hashStart !== -1) {\n\t\tinput = input.slice(0, hashStart);\n\t}\n\n\treturn input;\n}\n\nfunction getHash(url) {\n\tlet hash = '';\n\tconst hashStart = url.indexOf('#');\n\tif (hashStart !== -1) {\n\t\thash = url.slice(hashStart);\n\t}\n\n\treturn hash;\n}\n\nfunction extract(input) {\n\tinput = removeHash(input);\n\tconst queryStart = input.indexOf('?');\n\tif (queryStart === -1) {\n\t\treturn '';\n\t}\n\n\treturn input.slice(queryStart + 1);\n}\n\nfunction parseValue(value, options) {\n\tif (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {\n\t\tvalue = Number(value);\n\t} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {\n\t\tvalue = value.toLowerCase() === 'true';\n\t}\n\n\treturn value;\n}\n\nfunction parse(input, options) {\n\toptions = Object.assign({\n\t\tdecode: true,\n\t\tsort: true,\n\t\tarrayFormat: 'none',\n\t\tarrayFormatSeparator: ',',\n\t\tparseNumbers: false,\n\t\tparseBooleans: false\n\t}, options);\n\n\tvalidateArrayFormatSeparator(options.arrayFormatSeparator);\n\n\tconst formatter = parserForArrayFormat(options);\n\n\t// Create an object with no prototype\n\tconst ret = Object.create(null);\n\n\tif (typeof input !== 'string') {\n\t\treturn ret;\n\t}\n\n\tinput = input.trim().replace(/^[?#&]/, '');\n\n\tif (!input) {\n\t\treturn ret;\n\t}\n\n\tfor (const param of input.split('&')) {\n\t\tlet [key, value] = splitOnFirst(options.decode ? param.replace(/\\+/g, ' ') : param, '=');\n\n\t\t// Missing `=` should be `null`:\n\t\t// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters\n\t\tvalue = value === undefined ? null : ['comma', 'separator'].includes(options.arrayFormat) ? value : decode(value, options);\n\t\tformatter(decode(key, options), value, ret);\n\t}\n\n\tfor (const key of Object.keys(ret)) {\n\t\tconst value = ret[key];\n\t\tif (typeof value === 'object' && value !== null) {\n\t\t\tfor (const k of Object.keys(value)) {\n\t\t\t\tvalue[k] = parseValue(value[k], options);\n\t\t\t}\n\t\t} else {\n\t\t\tret[key] = parseValue(value, options);\n\t\t}\n\t}\n\n\tif (options.sort === false) {\n\t\treturn ret;\n\t}\n\n\treturn (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {\n\t\tconst value = ret[key];\n\t\tif (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {\n\t\t\t// Sort object keys, not values\n\t\t\tresult[key] = keysSorter(value);\n\t\t} else {\n\t\t\tresult[key] = value;\n\t\t}\n\n\t\treturn result;\n\t}, Object.create(null));\n}\n\nexports.extract = extract;\nexports.parse = parse;\n\nexports.stringify = (object, options) => {\n\tif (!object) {\n\t\treturn '';\n\t}\n\n\toptions = Object.assign({\n\t\tencode: true,\n\t\tstrict: true,\n\t\tarrayFormat: 'none',\n\t\tarrayFormatSeparator: ','\n\t}, options);\n\n\tvalidateArrayFormatSeparator(options.arrayFormatSeparator);\n\n\tconst shouldFilter = key => (\n\t\t(options.skipNull && isNullOrUndefined(object[key])) ||\n\t\t(options.skipEmptyString && object[key] === '')\n\t);\n\n\tconst formatter = encoderForArrayFormat(options);\n\n\tconst objectCopy = {};\n\n\tfor (const key of Object.keys(object)) {\n\t\tif (!shouldFilter(key)) {\n\t\t\tobjectCopy[key] = object[key];\n\t\t}\n\t}\n\n\tconst keys = Object.keys(objectCopy);\n\n\tif (options.sort !== false) {\n\t\tkeys.sort(options.sort);\n\t}\n\n\treturn keys.map(key => {\n\t\tconst value = object[key];\n\n\t\tif (value === undefined) {\n\t\t\treturn '';\n\t\t}\n\n\t\tif (value === null) {\n\t\t\treturn encode(key, options);\n\t\t}\n\n\t\tif (Array.isArray(value)) {\n\t\t\treturn value\n\t\t\t\t.reduce(formatter(key), [])\n\t\t\t\t.join('&');\n\t\t}\n\n\t\treturn encode(key, options) + '=' + encode(value, options);\n\t}).filter(x => x.length > 0).join('&');\n};\n\nexports.parseUrl = (input, options) => {\n\toptions = Object.assign({\n\t\tdecode: true\n\t}, options);\n\n\tconst [url, hash] = splitOnFirst(input, '#');\n\n\treturn Object.assign(\n\t\t{\n\t\t\turl: url.split('?')[0] || '',\n\t\t\tquery: parse(extract(input), options)\n\t\t},\n\t\toptions && options.parseFragmentIdentifier && hash ? {fragmentIdentifier: decode(hash, options)} : {}\n\t);\n};\n\nexports.stringifyUrl = (input, options) => {\n\toptions = Object.assign({\n\t\tencode: true,\n\t\tstrict: true\n\t}, options);\n\n\tconst url = removeHash(input.url).split('?')[0] || '';\n\tconst queryFromUrl = exports.extract(input.url);\n\tconst parsedQueryFromUrl = exports.parse(queryFromUrl, {sort: false});\n\n\tconst query = Object.assign(parsedQueryFromUrl, input.query);\n\tlet queryString = exports.stringify(query, options);\n\tif (queryString) {\n\t\tqueryString = `?${queryString}`;\n\t}\n\n\tlet hash = getHash(input.url);\n\tif (input.fragmentIdentifier) {\n\t\thash = `#${encode(input.fragmentIdentifier, options)}`;\n\t}\n\n\treturn `${url}${queryString}${hash}`;\n};\n\n\n//# sourceURL=webpack:///./node_modules/query-string/index.js?");

/***/ }),

/***/ "./node_modules/split-on-first/index.js":
/*!**********************************************!*\
  !*** ./node_modules/split-on-first/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = (string, separator) => {\n\tif (!(typeof string === 'string' && typeof separator === 'string')) {\n\t\tthrow new TypeError('Expected the arguments to be of type `string`');\n\t}\n\n\tif (separator === '') {\n\t\treturn [string];\n\t}\n\n\tconst separatorIndex = string.indexOf(separator);\n\n\tif (separatorIndex === -1) {\n\t\treturn [string];\n\t}\n\n\treturn [\n\t\tstring.slice(0, separatorIndex),\n\t\tstring.slice(separatorIndex + separator.length)\n\t];\n};\n\n\n//# sourceURL=webpack:///./node_modules/split-on-first/index.js?");

/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nmodule.exports = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);\n\n\n//# sourceURL=webpack:///./node_modules/strict-uri-encode/index.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const searchButton = document.querySelector(\"#search__btn\");\r\nconst queryString = __webpack_require__(/*! query-string */ \"./node_modules/query-string/index.js\");\r\n// <d374fdb169264f3a87e5d068ca70d124:1020f3ad8257423390fe82594464d076>\r\n//GET SPOTIFY ID\r\n\r\n//1. RECEIVE INPUT\r\n\r\nconst textArea = document.querySelector(\"#search__artist-title\");\r\nlet artistName = \" \";\r\n\r\nif (sessionStorage.userAuthorized === undefined) {\r\n\tsessionStorage.userAuthorized = \"false\";\r\n\tsessionStorage.verifier = generateRandomString();\r\n}\r\n\r\n//Utility functions for encoding verifier/code challenge\r\nfunction dec2hex(dec) {\r\n\treturn (\"0\" + dec.toString(16)).substr(-2);\r\n}\r\n\r\nfunction generateRandomString() {\r\n\tvar array = new Uint32Array(56 / 2);\r\n\twindow.crypto.getRandomValues(array);\r\n\treturn Array.from(array, dec2hex).join(\"\");\r\n}\r\n\r\nasync function sha256(plain) {\r\n\t// returns promise ArrayBuffer\r\n\tconst encoder = new TextEncoder();\r\n\tconst data = encoder.encode(plain);\r\n\treturn window.crypto.subtle.digest(\"SHA-256\", data);\r\n}\r\n\r\nfunction base64urlencode(a) {\r\n\t// Convert the ArrayBuffer to string using Uint8 array.\r\n\t// btoa takes chars from 0-255 and base64 encodes.\r\n\t// Then convert the base64 encoded to base64url encoded.\r\n\t// (replace + with -, replace / with _, trim trailing =)\r\n\treturn btoa(String.fromCharCode.apply(null, new Uint8Array(a)))\r\n\t\t.replace(/\\+/g, \"-\")\r\n\t\t.replace(/\\//g, \"_\")\r\n\t\t.replace(/=+$/, \"\");\r\n}\r\n\r\n// 1. Create the code verifier and challenge\r\n//1.1 generate a random code verifier\r\n\r\nsessionStorage.setItem(\"clientID\", \"d374fdb169264f3a87e5d068ca70d124\");\r\n\r\n//1.2 generate a code challenge\r\nasync function generateCodeChallenge(v) {\r\n\tconst hashed = await sha256(v);\r\n\tconst base64encoded = base64urlencode(hashed);\r\n\treturn base64encoded;\r\n}\r\n\r\n//2 Construct the authorization URI\r\n\r\nconst generateAuthURI = async () => {\r\n\tlet challenge = await generateCodeChallenge(sessionStorage.verifier);\r\n\r\n\tconst authorisationURI =\r\n\t\t\"https://accounts.spotify.com/authorize?\" +\r\n\t\tqueryString.stringify({\r\n\t\t\tclient_id: \"d374fdb169264f3a87e5d068ca70d124\",\r\n\t\t\tresponse_type: \"code\",\r\n\t\t\tredirect_uri: \"https://tauriqdolley.github.io/vibe-check/index.html\",\r\n\t\t\tcode_challenge_method: \"S256\",\r\n\t\t\tcode_challenge: challenge\r\n\t\t});\r\n\treturn authorisationURI;\r\n};\r\n\r\nwindow.onload = async function () {\r\n\tif (sessionStorage.userAuthorized === \"false\") {\r\n\t\tconst authURI = await generateAuthURI();\r\n\t\twindow.location = authURI;\r\n\t\tsessionStorage.userAuthorized = \"true\";\r\n\t} else {\r\n\t\tlet params = new URL(document.location).searchParams;\r\n\t\tlet code = params.get(\"code\");\r\n\t\tsessionStorage.setItem(\"code\", code);\r\n\r\n\t\tconst config = {\r\n\t\t\theaders: {\r\n\t\t\t\t\"Content-Type\": \"application/x-www-form-urlencoded\"\r\n\t\t\t}\r\n\t\t};\r\n\r\n\t\tconst requestBody = {\r\n\t\t\tclient_id: \"d374fdb169264f3a87e5d068ca70d124\",\r\n\t\t\tgrant_type: \"authorization_code\",\r\n\t\t\tcode: sessionStorage.getItem(\"code\"),\r\n\t\t\tredirect_uri: \"https://tauriqdolley.github.io/vibe-check/index.html\",\r\n\t\t\tcode_verifier: sessionStorage.verifier\r\n\t\t};\r\n\r\n\t\taxios\r\n\t\t\t.post(\r\n\t\t\t\t\"https://accounts.spotify.com/api/token\",\r\n\t\t\t\tqueryString.stringify(requestBody),\r\n\t\t\t\tconfig\r\n\t\t\t)\r\n\t\t\t.then((response) => {\r\n\t\t\t\tartistName = textArea.value.trim();\r\n\t\t\t\tsessionStorage.access_token = response.data.access_token;\r\n\t\t\t})\r\n\t\t\t.catch((error) => {\r\n\t\t\t\tconsole.log(\"Error with GET request\");\r\n\t\t\t\tconsole.log(error.response);\r\n\t\t\t\tconsole.log(error);\r\n\t\t\t});\r\n\t}\r\n};\r\n\r\nsearchButton.addEventListener(\"click\", searchArtists);\r\n\r\nfunction searchArtists() {\r\n\tif (textArea.value != \" \") {\r\n\t\tartistName = textArea.value;\r\n\t\taxios\r\n\t\t\t.get(\r\n\t\t\t\t\"https://api.spotify.com/v1/search?\" +\r\n\t\t\t\t\tqueryString.stringify({\r\n\t\t\t\t\t\tq: artistName,\r\n\t\t\t\t\t\ttype: [\"artist\"].join(),\r\n\t\t\t\t\t\tlimit: 1\r\n\t\t\t\t\t}),\r\n\t\t\t\t{\r\n\t\t\t\t\theaders: {\r\n\t\t\t\t\t\tAuthorization: \"Bearer \" + sessionStorage.access_token,\r\n\r\n\t\t\t\t\t\tAccept: \"application/json\",\r\n\t\t\t\t\t\t\"Content-Type\": \"application/application/json\"\r\n\t\t\t\t\t}\r\n\t\t\t\t},\r\n\t\t\t\tqueryString.stringify({\r\n\t\t\t\t\tgrant_type: \"client_credentials\"\r\n\t\t\t\t})\r\n\t\t\t)\r\n\t\t\t.catch((error) => {\r\n\t\t\t\t// console.log(accessToken);\r\n\t\t\t\tconsole.log(\"Error with GET request\");\r\n\t\t\t\tconsole.log(error.response);\r\n\t\t\t\t//console.log(error.response.data);\r\n\t\t\t\tconsole.log(error.response.data);\r\n\t\t\t})\r\n\t\t\t.then((response) => {\r\n\t\t\t\taxios\r\n\t\t\t\t\t.get(\r\n\t\t\t\t\t\t\"https://api.spotify.com/v1/artists/\" +\r\n\t\t\t\t\t\t\tresponse.data.artists.items[0].id +\r\n\t\t\t\t\t\t\t\"/related-artists\",\r\n\t\t\t\t\t\t{\r\n\t\t\t\t\t\t\theaders: {\r\n\t\t\t\t\t\t\t\t//prettier-ignore\r\n\t\t\t\t\t\t\t\t\"Authorization\" : \"Bearer \" +  sessionStorage.access_token,\r\n\t\t\t\t\t\t\t\tAccept: \"application/json\",\r\n\t\t\t\t\t\t\t\t\"Content-Type\": \"application/application/json\"\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t},\r\n\t\t\t\t\t\tqueryString.stringify({\r\n\t\t\t\t\t\t\tgrant_type: \"client_credentials\"\r\n\t\t\t\t\t\t})\r\n\t\t\t\t\t)\r\n\t\t\t\t\t.then((response) => {\r\n\t\t\t\t\t\tconsole.log(\"Similar Artist Data\");\r\n\t\t\t\t\t\tconsole.log(response.data.artists);\r\n\r\n\t\t\t\t\t\tconst artistCards = document.querySelectorAll(\".card\");\r\n\t\t\t\t\t\tlet count = 0;\r\n\t\t\t\t\t\tartistCards.forEach((card) => {\r\n\t\t\t\t\t\t\tconst title = card.querySelector(\"h5\");\r\n\t\t\t\t\t\t\tconst cardText = card.querySelector(\"p\");\r\n\t\t\t\t\t\t\tconst button = card.querySelector(\"a\");\r\n\t\t\t\t\t\t\tcard.firstElementChild.src =\r\n\t\t\t\t\t\t\t\tresponse.data.artists[count].images[0].url;\r\n\t\t\t\t\t\t\ttitle.innerHTML = `<h5 class=\"card-title\">${response.data.artists[count].name}</h5>`;\r\n\t\t\t\t\t\t\tcardText.innerHTML = `Genres : ${response.data.artists[\r\n\t\t\t\t\t\t\t\tcount\r\n\t\t\t\t\t\t\t].genres\r\n\t\t\t\t\t\t\t\t.slice(0, 3)\r\n\t\t\t\t\t\t\t\t.join(\", \")}`;\r\n\t\t\t\t\t\t\tbutton.innerHTML = \"Listen on Spotify\";\r\n\t\t\t\t\t\t\tbutton.href = response.data.artists[count].external_urls.spotify;\r\n\r\n\t\t\t\t\t\t\tcard.classList.add(\"fade-in\");\r\n\r\n\t\t\t\t\t\t\tcount++;\r\n\t\t\t\t\t\t});\r\n\t\t\t\t\t\tconsole.log(document.querySelectorAll(\".card a\"));\r\n\t\t\t\t\t\tdocument.querySelector(\".card a\").scrollIntoView(top);\r\n\t\t\t\t\t\t//Attempt to update card one's image to new image\r\n\t\t\t\t\t});\r\n\t\t\t})\r\n\t\t\t.catch((error) => {\r\n\t\t\t\t// console.log(accessToken);\r\n\t\t\t\tconsole.log(\"Error with GET request\");\r\n\t\t\t\tconsole.log(error.response);\r\n\t\t\t\t//console.log(error.response.data);\r\n\t\t\t\tconsole.log(error);\r\n\t\t\t});\r\n\t}\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ })

/******/ });

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("homey"), require("athom-api"));
	else if(typeof define === 'function' && define.amd)
		define(["homey", "athom-api"], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory(require("homey"), require("athom-api"));
	else
		root["library"] = factory(root["homey"], root["athom-api"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__11__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
let logs = [];
let logEnabled = true;
const MAX_LOGS = 100;
function logRaw(level, message) {
    if (!logEnabled) {
        return;
    }
    logs.push({
        date: new Date(),
        level,
        message,
    });
    if (logs.length > MAX_LOGS) {
        logs = logs.slice(logs.length - MAX_LOGS);
    }
}
function log(message) {
    logRaw('ok', message);
    console.log(message);
}
exports.log = log;
function error(message) {
    logRaw('error', message);
    console.error(message);
}
exports.error = error;
function debug(message) {
    logRaw('debug', message);
    console.log(message);
}
exports.debug = debug;
function get() {
    return logs;
}
exports.get = get;
function enableLog() {
    logEnabled = true;
}
exports.enableLog = enableLog;
function disableLog() {
    logEnabled = false;
}
exports.disableLog = disableLog;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function Catch(swallow = false) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            try {
                const result = originalMethod.apply(this, args);
                // check if method is asynchronous
                if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
                    return result.catch((theError) => {
                        console.error(`A fault occured in ${propertyKey}: \n|${originalMethod.toString().replace(/\n/g, '\n| ')}`, theError);
                        if (!swallow) {
                            throw theError;
                        }
                    });
                }
                return result;
            }
            catch (theError) {
                if (!swallow) {
                    throw theError;
                }
            }
        };
        return descriptor;
    };
}
exports.Catch = Catch;


/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const homey_1 = __importDefault(__webpack_require__(1));
const DakBoardManager_1 = __webpack_require__(10);
const mgr = new DakBoardManager_1.DakBoardManager();
class Wrapper extends homey_1.default.App {
    get() {
        return mgr;
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mgr.onInit();
        });
    }
}
module.exports = Wrapper;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const athom_api_1 = __webpack_require__(11);
const LogManager_1 = __webpack_require__(0);
const SettingsManager_1 = __webpack_require__(12);
const utils_1 = __webpack_require__(2);
class DakBoardManager {
    constructor() {
        this.apiKeyHandlers = [];
        this.loaded = false;
        LogManager_1.log(`Starting dakboard manager`);
        this.api = undefined;
        this.settingsManager = new SettingsManager_1.SettingsManager({
            onApiKey: (apiKey) => {
                this.apiKeyHandlers.forEach(h => h(apiKey));
            },
        });
    }
    onApiKeyChanged(handler) {
        this.apiKeyHandlers.push(handler);
    }
    updateApiKey(apiKey) {
        this.settingsManager.setApiKey(apiKey);
        this.apiKeyHandlers.forEach(h => h(apiKey));
    }
    getApiKey() {
        return this.settingsManager.getSettings().apiKey || '';
    }
    getLogs() {
        return LogManager_1.get();
    }
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            LogManager_1.log(`Initializing dakboard manager`);
            this.api = yield athom_api_1.HomeyAPI.forCurrentHomey();
            yield this.settingsManager.start();
            this.loaded = true;
        });
    }
}
__decorate([
    utils_1.Catch()
], DakBoardManager.prototype, "getLogs", null);
__decorate([
    utils_1.Catch()
], DakBoardManager.prototype, "onInit", null);
exports.DakBoardManager = DakBoardManager;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __webpack_require__(1);
const LogManager_1 = __webpack_require__(0);
class SettingsManager {
    constructor(listener) {
        this.listener = listener;
        this.settings = {
            apiKey: '',
        };
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.settings = Object.assign(Object.assign({}, this.settings), homey_1.ManagerSettings.get('settings'));
            yield this.listener.onApiKey(this.settings.apiKey);
            this.subscribe();
        });
    }
    setApiKey(apiKey) {
        this.settings.apiKey = apiKey;
        homey_1.ManagerSettings.set('settings', this.settings);
    }
    getSettings() {
        return this.settings;
    }
    setSettings(settings) {
        homey_1.ManagerSettings.set('settings', Object.assign(Object.assign({}, this.settings), settings));
    }
    subscribe() {
        homey_1.ManagerSettings.on('set', (variable) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (variable === 'settings') {
                    const settings = homey_1.ManagerSettings.get('settings');
                    LogManager_1.log(`Api key updated`);
                    this.settings = Object.assign({}, settings);
                    yield this.listener.onApiKey(this.settings.apiKey);
                }
            }
            catch (err) {
                LogManager_1.error(`Failed to update settings: ${err}`);
            }
        }));
    }
}
exports.SettingsManager = SettingsManager;


/***/ })
/******/ ]);
});
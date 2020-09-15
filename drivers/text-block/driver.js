(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("homey"), require("axios"), require("qs"));
	else if(typeof define === 'function' && define.amd)
		define(["homey", "axios", "qs"], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory(require("homey"), require("axios"), require("qs"));
	else
		root["library"] = factory(root["homey"], root["axios"], root["qs"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__5__, __WEBPACK_EXTERNAL_MODULE__6__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 15);
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
/* 3 */
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
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(__webpack_require__(5));
const qs_1 = __importDefault(__webpack_require__(6));
const LogManager_1 = __webpack_require__(0);
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const BASE_URL = 'https://dakboard.com/api/2';
const RETRY_DELAY = 500;
const RETRIES = 5;
class DakBoardClient {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    disableBlock(screen, block, isDisabled) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.put(`/screens/${screen}/blocks/${block}`, { is_disabled: isDisabled });
        });
    }
    setText(screen, block, text) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.put(`/screens/${screen}/blocks/${block}`, { text, is_disabled: 0 });
        });
    }
    refresh(screen) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.put(`/screens/${screen}`, { refresh: 1 });
        });
    }
    getScreens() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get('/screens');
        });
    }
    getBlocks(screen) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get(`/screens/${screen}/blocks`);
        });
    }
    get(path, retry = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
            LogManager_1.debug(`GET: ${BASE_URL}${path}`);
            try {
                const ret = yield axios_1.default.get(url);
                return ret.data;
            }
            catch (err) {
                LogManager_1.log(`Failed to fetch block (${retry}, ${path}): ${err.response.status}`);
                if (retry < RETRIES && err.response.status === 404) {
                    yield delay(RETRIES);
                    return yield this.get(path, retry + 1);
                }
                LogManager_1.error(`Failed to fetch block (${path}): ${err.response.status}`);
                throw Error(`Failed to fetch block (${path}): ${err.response.status}`);
            }
        });
    }
    put(path, data, retry = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${BASE_URL}${path}?api_key=${this.apiKey}`;
            LogManager_1.debug(`PUT: ${BASE_URL}${path}`);
            const headers = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            };
            try {
                const ret = yield axios_1.default.put(url, qs_1.default.stringify(data), headers);
                return ret.data;
            }
            catch (err) {
                LogManager_1.log(`Failed to update block (${retry}, ${url}): ${err.response.status}`);
                if (retry < RETRIES && err.response.status === 404) {
                    yield delay(RETRY_DELAY);
                    return yield this.put(path, data, retry + 1);
                }
                LogManager_1.error(`Failed to update block (${url}): ${err.response.status}`);
                throw Error(`Failed to update block (${url}): ${err.response.status}`);
            }
        });
    }
}
exports.default = DakBoardClient;


/***/ }),
/* 4 */
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
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __webpack_require__(1);
const DakBoardClient_1 = __importDefault(__webpack_require__(3));
const LogManager_1 = __webpack_require__(0);
exports.capabilities = {
    /**
     * Disable block #maintenanceAction
     */
    disable: 'button.disable_block',
    /**
     * Enable block #maintenanceAction
     */
    enable: 'button.enable_block',
    /**
     * Refresh screen (of block) #maintenanceAction
     */
    refresh: 'button.refresh_screen',
};
/**
 * TextBlock for dakboard
 * #class:other
 */
class BaseDriver extends homey_1.Driver {
    onInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getTM().onApiKeyChanged(apiKey => {
                this.apiKey = apiKey;
            });
        });
    }
    onPair(socket, typeFilter) {
        let screen = '';
        socket.on('get_api_key', (data, callback) => {
            callback(null, this.apiKey);
        });
        socket.on('verify_api_key', (apiKey, callback) => {
            const client = new DakBoardClient_1.default(apiKey);
            client.getScreens().then(screens => {
                this.apiKey = apiKey;
                this.getTM().updateApiKey(apiKey);
                callback(undefined, screens);
            }, reason => {
                LogManager_1.error(`Failed to login to dakboard: ${reason}`);
                callback(`Failed to login to dakboard: ${reason}`);
            });
        });
        socket.on('select_screen', (selectedScreen, callback) => {
            screen = selectedScreen;
            callback(undefined, 'ok');
        });
        socket.on('showView', (viewId, callback) => {
            callback();
        });
        socket.on('list_devices', (data, callback) => {
            const client = new DakBoardClient_1.default(this.apiKey);
            client.getBlocks(screen).then(blocks => {
                if (typeFilter) {
                    blocks = blocks.filter(b => b.type === typeFilter);
                }
                callback(null, blocks.map(s => ({ name: s.name ? s.name : s.id, data: { name: s.name, screen, block: s.id } })));
            }, reason => {
                LogManager_1.error(`Failed to fetch blocks: ${reason}`);
                callback(`Failed to fetch blocks: ${reason}`);
            });
        });
    }
    getTM() {
        return homey_1.app.get();
    }
}
exports.BaseDriver = BaseDriver;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
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
const homey_1 = __webpack_require__(1);
const LogManager_1 = __webpack_require__(0);
const utils_1 = __webpack_require__(2);
class ActionManager {
    constructor(handler, prefix = '') {
        this.handler = handler;
        this.prefix = prefix;
        this.cards = {};
        for (const id in handler) {
            try {
                this.cards[id] = new homey_1.FlowCardAction(prefix + id);
            }
            catch (err) {
                LogManager_1.error(`Failed to register action card ${prefix + id}: ${err}`);
            }
        }
    }
    register() {
        LogManager_1.log(`Registering ${Object.keys(this.cards).length} actions`);
        for (const id in this.cards) {
            this.cards[id].register().registerRunListener((args, state) => __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield this.handler[id](args);
                }
                catch (err) {
                    LogManager_1.error(`Failed to fire trigger ${this.prefix}${id}: ${err}`);
                }
            }));
        }
    }
}
__decorate([
    utils_1.Catch()
], ActionManager.prototype, "register", null);
exports.ActionManager = ActionManager;


/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */
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
const ActionManager_1 = __webpack_require__(7);
const BaseDriver_1 = __webpack_require__(4);
/**
 * Text block
 * #class:other
 */
class Driver extends BaseDriver_1.BaseDriver {
    onInit() {
        const _super = Object.create(null, {
            onInit: { get: () => super.onInit }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.actions = new ActionManager_1.ActionManager({
                EnableBlock(args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (args.enabled === 'enable') {
                            yield args.device.enable(args.updateOnlyIfChanged === 'changed', args.refreshScreen === 'always');
                        }
                        else {
                            yield args.device.disable(args.updateOnlyIfChanged === 'changed', args.refreshScreen === 'always');
                        }
                        return true;
                    });
                },
                SetText(args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield args.device.setText(args.text, args.updateOnlyIfChanged === 'changed', args.refreshScreen === 'always');
                        return true;
                    });
                },
                Refresh(args) {
                    return __awaiter(this, void 0, void 0, function* () {
                        yield args.device.refresh();
                        return true;
                    });
                },
            }, 'ITextActionHandler.');
            this.actions.register();
            yield _super.onInit.call(this);
        });
    }
    onPair(socket) {
        super.onPair(socket, 'text');
    }
}
module.exports = Driver;


/***/ })
/******/ ]);
});
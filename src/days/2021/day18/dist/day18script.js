"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
exports.script2 = exports.script1 = void 0;
var day18Input_1 = require("./day18Input");
function script1(useExample) {
    return __awaiter(this, void 0, void 0, function () {
        var usedInput, _res;
        return __generator(this, function (_a) {
            usedInput = useExample ? day18Input_1.exampleArray : day18Input_1.inputArray;
            _res = run(usedInput);
            return [2 /*return*/, _res];
        });
    });
}
exports.script1 = script1;
function script2(useExample) {
    return __awaiter(this, void 0, void 0, function () {
        var usedInput, _res;
        return __generator(this, function (_a) {
            usedInput = useExample ? day18Input_1.exampleArray : day18Input_1.inputArray;
            _res = run(usedInput);
            return [2 /*return*/, _res];
        });
    });
}
exports.script2 = script2;
var run = function (input) {
    var pointer = 1;
    var length = input.length;
    var base = representAsObject(input[0], undefined);
    var added;
    var currentRes;
    var working = true;
    while (pointer < length) {
        working = true;
        added = representAsObject(input[pointer], undefined);
        currentRes = addUp(base, added);
        while (working) {
            var _a = reduceSnail(currentRes), newRes = _a.newRes, found = _a.found;
            currentRes = newRes;
            working = found;
        }
        base = currentRes;
        pointer++;
    }
    return base;
};
var addUp = function (base, added) {
    var newTop = {
        'left': base,
        'right': added,
        parent: undefined
    };
    base.parent = newTop;
    added.parent = newTop;
    return newTop;
    // return [base,added];
    // // return `[${base},${added}]`;
};
function getDeepestObject(obj) {
    var children = [];
    Object.keys(obj).forEach(function (key) {
        if (typeof obj[key] === 'object' && obj[key] && key !== 'parent')
            children.push(getDeepestObject(obj[key]));
    });
    if (!children.length) {
        return { obj: obj, level: 0 };
    }
    else {
        var deepestChild = { level: -1 };
        children.forEach(function (child) {
            if (child.level > deepestChild.level)
                deepestChild = child;
        });
        return deepestChild;
    }
}
var depthOf = function (object) {
    var level = 1;
    var deepestObject;
    for (var key in object) {
        if (!object.hasOwnProperty(key) || key === 'parent')
            continue;
        if (typeof object[key] == 'object') {
            var depth = depthOf(object[key]).level + 1;
            level = Math.max(depth, level);
            if (!deepestObject && level === 5)
                deepestObject = object;
        }
    }
    return { level: level, deepestObject: deepestObject };
};
var reduceSnail = function (snailNumber) {
    var found = false;
    // console.log('depth:',depthOf(snailNumber))
    // console.log('deepestOb:', getDeepestObject(snailNumber))
    var deepest = depthOf(snailNumber).level;
    if (deepest > 4) {
        if (deepest > 5)
            debugger;
        var objectToExplode = getDeepestObject(snailNumber).obj;
        explode(objectToExplode);
        found = true;
        console.log({ snailNumber: snailNumber });
    }
    return { newRes: snailNumber, found: found };
};
var explode = function (snailNumber) {
    var copy = __assign({}, snailNumber);
    //make it 0
    debugger;
    addLeftMost(copy['left'], snailNumber.parent, snailNumber, 'left');
    debugger;
    addRightMost(copy['right'], snailNumber.parent, snailNumber, 'right');
    var parent = snailNumber.parent;
    if (snailNumber.parent.left === snailNumber) {
        //is left
        snailNumber.parent.left = 0;
    }
    else {
        //is right
        snailNumber.parent.right = 0;
    }
    console.log(parent);
};
var representAsObject = function (snailNumber, parent) {
    return {
        'left': isNumber(snailNumber[0]) ? snailNumber[0] : representAsObject(snailNumber[0], _this),
        'right': isNumber(snailNumber[1]) ? snailNumber[1] : representAsObject(snailNumber[1], _this),
        parent: parent
    };
};
var isNumber = function (tested) {
    return typeof tested === 'number';
};
var addLeftMost = function (number, parent, exploaded, side) {
    if (side === 'left') {
        //this is a number on the left that should go to the left
        if (parent['left'] === exploaded) {
            //explo was on the left
            //need to go up1
            addRightMost(number, parent.parent, parent);
        }
        else {
            //explo was on the right 
            //need to add to left
            if (isNumber(parent.left)) {
                parent.left = parent.left + number;
            }
            else {
                addLeftMost(number, parent.right, undefined, undefined);
            }
        }
    }
    debugger;
    if (parent['left'] === exploaded) {
        //explo was on the left
        //need to go up1
        addRightMost(number, parent.parent, parent);
    }
    else {
        //explo was on the right 
        //need to add to left
        if (isNumber(parent.left)) {
            parent.left = parent.left + number;
        }
        else {
            addLeftMost(number, parent.right, undefined);
        }
    }
};
var addRightMost = function (number, parent, exploaded) {
    debugger;
    if (parent['right'] === exploaded) {
        //explo was on the right
        //need to go up1
        addLeftMost(number, parent.parent, exploaded);
    }
    else {
        //explo was on the left
        //need to add to left
        if (isNumber(parent.right)) {
            parent.right = parent.right + number;
        }
        else {
            addRightMost(number, parent.left, undefined);
        }
    }
};

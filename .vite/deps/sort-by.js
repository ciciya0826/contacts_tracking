import {
  __commonJS
} from "./chunk-7D4SUZUM.js";

// node_modules/object-path/index.js
var require_object_path = __commonJS({
  "node_modules/object-path/index.js"(exports, module) {
    (function(root, factory) {
      "use strict";
      if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.objectPath = factory();
      }
    })(exports, function() {
      "use strict";
      var toStr = Object.prototype.toString, _hasOwnProperty = Object.prototype.hasOwnProperty;
      function isEmpty(value) {
        if (!value) {
          return true;
        }
        if (isArray(value) && value.length === 0) {
          return true;
        } else {
          for (var i in value) {
            if (_hasOwnProperty.call(value, i)) {
              return false;
            }
          }
          return true;
        }
      }
      function toString(type) {
        return toStr.call(type);
      }
      function isNumber(value) {
        return typeof value === "number" || toString(value) === "[object Number]";
      }
      function isString(obj) {
        return typeof obj === "string" || toString(obj) === "[object String]";
      }
      function isObject(obj) {
        return typeof obj === "object" && toString(obj) === "[object Object]";
      }
      function isArray(obj) {
        return typeof obj === "object" && typeof obj.length === "number" && toString(obj) === "[object Array]";
      }
      function isBoolean(obj) {
        return typeof obj === "boolean" || toString(obj) === "[object Boolean]";
      }
      function getKey(key) {
        var intKey = parseInt(key);
        if (intKey.toString() === key) {
          return intKey;
        }
        return key;
      }
      function set(obj, path, value, doNotReplace) {
        if (isNumber(path)) {
          path = [path];
        }
        if (isEmpty(path)) {
          return obj;
        }
        if (isString(path)) {
          return set(obj, path.split("."), value, doNotReplace);
        }
        var currentPath = getKey(path[0]);
        if (path.length === 1) {
          var oldVal = obj[currentPath];
          if (oldVal === void 0 || !doNotReplace) {
            obj[currentPath] = value;
          }
          return oldVal;
        }
        if (obj[currentPath] === void 0) {
          if (isNumber(currentPath)) {
            obj[currentPath] = [];
          } else {
            obj[currentPath] = {};
          }
        }
        return set(obj[currentPath], path.slice(1), value, doNotReplace);
      }
      function del(obj, path) {
        if (isNumber(path)) {
          path = [path];
        }
        if (isEmpty(obj)) {
          return void 0;
        }
        if (isEmpty(path)) {
          return obj;
        }
        if (isString(path)) {
          return del(obj, path.split("."));
        }
        var currentPath = getKey(path[0]);
        var oldVal = obj[currentPath];
        if (path.length === 1) {
          if (oldVal !== void 0) {
            if (isArray(obj)) {
              obj.splice(currentPath, 1);
            } else {
              delete obj[currentPath];
            }
          }
        } else {
          if (obj[currentPath] !== void 0) {
            return del(obj[currentPath], path.slice(1));
          }
        }
        return obj;
      }
      var objectPath = {};
      objectPath.ensureExists = function(obj, path, value) {
        return set(obj, path, value, true);
      };
      objectPath.set = function(obj, path, value, doNotReplace) {
        return set(obj, path, value, doNotReplace);
      };
      objectPath.insert = function(obj, path, value, at) {
        var arr = objectPath.get(obj, path);
        at = ~~at;
        if (!isArray(arr)) {
          arr = [];
          objectPath.set(obj, path, arr);
        }
        arr.splice(at, 0, value);
      };
      objectPath.empty = function(obj, path) {
        if (isEmpty(path)) {
          return obj;
        }
        if (isEmpty(obj)) {
          return void 0;
        }
        var value, i;
        if (!(value = objectPath.get(obj, path))) {
          return obj;
        }
        if (isString(value)) {
          return objectPath.set(obj, path, "");
        } else if (isBoolean(value)) {
          return objectPath.set(obj, path, false);
        } else if (isNumber(value)) {
          return objectPath.set(obj, path, 0);
        } else if (isArray(value)) {
          value.length = 0;
        } else if (isObject(value)) {
          for (i in value) {
            if (_hasOwnProperty.call(value, i)) {
              delete value[i];
            }
          }
        } else {
          return objectPath.set(obj, path, null);
        }
      };
      objectPath.push = function(obj, path) {
        var arr = objectPath.get(obj, path);
        if (!isArray(arr)) {
          arr = [];
          objectPath.set(obj, path, arr);
        }
        arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
      };
      objectPath.coalesce = function(obj, paths, defaultValue) {
        var value;
        for (var i = 0, len = paths.length; i < len; i++) {
          if ((value = objectPath.get(obj, paths[i])) !== void 0) {
            return value;
          }
        }
        return defaultValue;
      };
      objectPath.get = function(obj, path, defaultValue) {
        if (isNumber(path)) {
          path = [path];
        }
        if (isEmpty(path)) {
          return obj;
        }
        if (isEmpty(obj)) {
          return defaultValue;
        }
        if (isString(path)) {
          return objectPath.get(obj, path.split("."), defaultValue);
        }
        var currentPath = getKey(path[0]);
        if (path.length === 1) {
          if (obj[currentPath] === void 0) {
            return defaultValue;
          }
          return obj[currentPath];
        }
        return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
      };
      objectPath.del = function(obj, path) {
        return del(obj, path);
      };
      return objectPath;
    });
  }
});

// node_modules/sort-by/index.js
var require_sort_by = __commonJS({
  "node_modules/sort-by/index.js"(exports, module) {
    var objectPath = require_object_path();
    var sortBy;
    var sort;
    var type;
    type = function(type2) {
      return function(arg) {
        return typeof arg === type2;
      };
    };
    sort = function sort2(property, map) {
      var sortOrder = 1;
      var apply = map || function(_, value) {
        return value;
      };
      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function fn(a, b) {
        var result;
        var am = apply(property, objectPath.get(a, property));
        var bm = apply(property, objectPath.get(b, property));
        if (am < bm) result = -1;
        if (am > bm) result = 1;
        if (am === bm) result = 0;
        return result * sortOrder;
      };
    };
    sortBy = function sortBy2() {
      var args = Array.prototype.slice.call(arguments);
      var properties = args.filter(type("string"));
      var map = args.filter(type("function"))[0];
      return function fn(obj1, obj2) {
        var numberOfProperties = properties.length, result = 0, i = 0;
        while (result === 0 && i < numberOfProperties) {
          result = sort(properties[i], map)(obj1, obj2);
          i++;
        }
        return result;
      };
    };
    module.exports = sortBy;
  }
});
export default require_sort_by();
//# sourceMappingURL=sort-by.js.map

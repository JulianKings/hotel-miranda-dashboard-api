"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFromJsonFile = deleteFromJsonFile;
exports.readJsonFile = readJsonFile;
exports.updateJsonFile = updateJsonFile;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function readJsonFile(filePath) {
  return JSON.parse(_fs["default"].readFileSync(filePath, 'utf8'));
}
function updateJsonFile(filePath, newData) {
  _fs["default"].readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    var jsonData = JSON.parse(data);
    if (newData) {
      if (jsonData.find(function (element) {
        return element.id === newData.id;
      })) {
        var updatedData = jsonData.map(function (element) {
          if (element.id === newData.id) {
            return newData;
          } else {
            return element;
          }
        });
        _fs["default"].writeFile(filePath, JSON.stringify(updatedData), function (err) {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
        });
      } else {
        jsonData.push(newData);
        _fs["default"].writeFile(filePath, JSON.stringify(jsonData), function (err) {
          if (err) {
            console.error("Error writing file:", err);
            return;
          }
        });
      }
      return [newData];
    } else {
      return jsonData;
    }
  });
}
function deleteFromJsonFile(filePath, newData) {
  _fs["default"].readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    var jsonData = JSON.parse(data);
    if (newData) {
      var updatedData = jsonData.filter(function (element) {
        return element.id !== newData.id;
      });
      _fs["default"].writeFile(filePath, JSON.stringify(updatedData, null, 2), function (err) {
        if (err) {
          console.error("Error writing file:", err);
          return;
        }
      });
    }
  });
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var dogSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    age: Number
});
var Dog = mongoose.model('Dog', dogSchema);
exports.default = Dog;
//# sourceMappingURL=dog.js.map
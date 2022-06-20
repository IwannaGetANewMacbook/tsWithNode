"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var prod = process.env.NODE_ENV === "production";
app.set("port", prod ? process.env.PORT : 3065);
app.get("/", function (req, res, next) {
    res.send("react nodebird backend completed!");
});
// 배포용은 포트를 자유자재로, 개발용은 포트를 3065로 고정시킴!
app.listen(app.get("port"), function () {
    console.log("server is running on: " + app.get("port"));
});

const express = require("express");
const app = express();
const https = require("https");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const API_HOST = "color-generator-api-cc.herokuapp.com";

app.get("/proxy/generate-color", function(req, res) {
    
    var options = {
        host: API_HOST,
        path: "/api/v1/color"
    };
    
    var request = https.get(options, function(response) {
        var bodyChunks = [];
        response.on("data", function(chunk) {
            bodyChunks.push(chunk);
        }).on("end", function() {
            var body = Buffer.concat(bodyChunks);
            var parsed = JSON.parse(body);
            res.status(200).send({
                status: "success",
                message: "here is your color!",
                color: parsed.color
            });
            console.log(parsed);
        });
    });

    request.on("error", function(e) {
        console.log(e.message);
    });
});

app.get("/proxy/get-all-colors", function(req, res) {
    var options = {
        host: API_HOST,
        path: "/api/v1/historical-colors"
    }

    var request = https.get(options, function(response) {
        var bodyChunks = [];
        response.on("data", function(chunk) {
            bodyChunks.push(chunk);
        }).on("end", function() {
            var body = Buffer.concat(bodyChunks);
            var parsed = JSON.parse(body);
            res.status(200).send({
                status: "success",
                message: "here are all the colors!",
                colors: parsed.colors
            });
        });
    });
    request.on("error", function(e) {
        console.log(e.message);
    })
});

app.listen(PORT, function startServer() {
    console.log(`Server listening on port ${PORT}`);
});

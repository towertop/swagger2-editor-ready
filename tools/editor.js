var fs = require("fs");
var path = require("path");
var util_1 = require("util");
var express = require("express");

// https://github.com/swagger-api/swagger-node/blob/master/lib/commands/project/swagger_editor.js
// var SWAGGER_EDITOR_DIR = path.dirname(require.resolve("swagger-editor"));
var SWAGGER_EDITOR_DIR = "node_modules/swagger-editor";
// swagger-editor must be served from root
var SWAGGER_EDITOR_SERVE_PATH = "/";
// swagger-editor expects to GET the file here
var SWAGGER_EDITOR_LOAD_PATH = "/editor/spec";
// swagger-editor PUTs the file back here
var SWAGGER_EDITOR_SAVE_PATH = "/editor/spec";
// swagger-editor GETs the configuration files
var SWAGGER_EDITOR_CONFIG_PATH = "/config/defaults.json";
var SWAGGER_EDITOR_POINTER_PATH = "/pointers";

// https://github.com/swagger-api/swagger-editor/blob/master/config/defaults.json.guide.js
exports.editorConfig = {
    analytics: { google: { id: null } },
    disableCodeGen: true,
    examplesFolder: "/spec-files/",
    exampleFiles: [],
    editorOptions: {},
    autocompleteExtension: {},
    useBackendForStorage: true,
    keyPressDebounceTime: 200,
    backendThrottle: 200,
    backendEndpoint: SWAGGER_EDITOR_LOAD_PATH,
    backendHealthCheckTimeout: 5000,
    useYamlBackend: true,
    disableFileMenu: true,
    headerBranding: false,
    enableTryIt: true,
    brandingCssClass: null,
    disableNewUserIntro: true,
    importProxyUrl: "https://cors-it.herokuapp.com/?url=",
    pointerResolutionBasePath: SWAGGER_EDITOR_POINTER_PATH
};

function start(fileName, port) {
    var swagger_file = path.resolve(process.cwd(), fileName);
    var refs_dir = path.dirname(swagger_file);
    if (!fs.existsSync(swagger_file)) {
        throw new Error(util_1.format("editor: nonexist swagger file at %s", swagger_file));
    }
    var app = express();
    // save the file from swagger-editor
    app.use(SWAGGER_EDITOR_SAVE_PATH, function (req, res, next) {
        if (req.method !== "PUT") {
            return next();
        }
        var stream = fs.createWriteStream(swagger_file);
        req.pipe(stream);
        stream.on("finish", function () {
            res.end("ok");
        });
    });
    // retrieve the project swagger file for the swagger-editor
    app.use(SWAGGER_EDITOR_LOAD_PATH, express.static(swagger_file));
    app.use(SWAGGER_EDITOR_POINTER_PATH, express.static(refs_dir));
    app.use(SWAGGER_EDITOR_CONFIG_PATH, function (req, res, next) {
        if (req.method !== "GET") {
            return next();
        }
        res.end(JSON.stringify(exports.editorConfig));
    });
    // serve swagger-editor
    app.use(SWAGGER_EDITOR_SERVE_PATH, express.static(SWAGGER_EDITOR_DIR));
    port = port ? +port : 8081;
    app.listen(port, function serverBounded() {
        console.log(util_1.format("SwaggerEditor start on http://127.0.0.1:%d", port));
        console.log("Do not shutdown this process before the edits synced up.");
    })
        .on("error", function serverErrored(e) {
        throw e;
    });
}

exports["default"] = start;

if (require.main === module) {
    if (process.argv[3]) {
        start(process.argv[2], process.argv[3]);
    } else if (process.argv[2]) {
        start(process.argv[2]);
    }
    else {
        console.log("Requires the api yaml file name to edit!");
    }
}

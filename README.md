# Swagger 2.0 API Design and Testing

## Introduction

This is a ready-made tool for designing HTTP API with Swagger 2.0 specification. For refrences, check out [OpenAPI Specification (fka Swagger RESTful API Documentation Specification)](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md).

The basic contribution of this project is only to host the [Swagger Editor](https://github.com/swagger-api/swagger-editor) locally. It can help both frontend and backend developers to design API endpoints, test them, and track changes.

## Setup and Usage

As like all npm packages, just type command:

    npm install

And to run the editor is:

    npm run editor <path-to-your-api.yaml> [port]

As hinted by the command output, it will host the editor webapp on [http://127.0.0.1:8081/](http://127.0.0.1:8081/) as default. 

You can open it with browser and start to edit API, and any changes within the webapp will be dumped to the file on disks.

The editor can be also used to test the API endpoints. Just change the `host` and `basePath` field to point to the server target.

## Advices

1. Always add your API file to git before any edit.
2. Group your API endpoints into multiple files and orgnize them with folders.
3. Use json referenece pointer to extract duplicate pieces and use them across files.

I refactoried [the official example](http://editor.swagger.io/) into `server` folder. Have a look at its `README.md`.

## Roadmap

1. Make the same tool for OpenAPI 3.0 !
2. Collect reusable pieces for API patterns, such as captcha, JWT, paginated query ant etc..
3. Add scripts to help combine, export, and publish the API document.
4. Find and add tool to automize the API mocking and testing.
5. Go deep into [Swagger Editor](https://github.com/swagger-api/swagger-editor) to add support for editing multiple files within a single webapp.



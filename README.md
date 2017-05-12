# LocalAPI with CORS support

## Installation:
For windows users you have to install build tools to support python:
```
npm install -g windows-build-tools
```
Building and linking of LocalAPI with CORS support:
```
cd local-api-with-cors
npm install
npm link
```
To check what is installed:
```
npm ls -g --depth=0
```

## Usage:
```
localapi run --cors api.raml
```

After starting server you'll see the first line of console output:
```
info: This server is  CORS-enabled  for all origins!
```

If you do any changes to source files of local-api-with-cors do ``npm install`` and your changes will be globally available

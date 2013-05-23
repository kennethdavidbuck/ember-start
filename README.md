# ember-start

This is a build/development tool for Ember developers to setup a basic application that includes: LESS compilation, concatenation of all javascript to a single app.js file, ember templates compilation, jshinting, local http server, project watch tools.  It also includes a "release" function which will uglify (minify/compress) all files for a production deployment version of your app.  

## Getting Started
	
**THIS GETTING STARTED ASSUMES YOU ALREADY HAVE NPM INSTALLED**

If you do not, download it here: [NPM](https://npmjs.org)

open up your terminal/cmd

run
```shell
npm install -g grunt-cli
//this installs the grunt command globally

cd to directory for code
//this is where we will put the code

git clone https://github.com/kennethdavidbuck/ember-start.git
//this downloads the repository

cd into repository root
//this is where we'll run grunt tasks from

npm install
//this will install all the dependencies of the project

grunt
//starts our build tools
```

Access the page at - **http://localhost:9091/**

**Note that this is loading the /debug directory of files**

Your **terminal** will continue to **watch** project directories as you save/edit files.  On each **save**, grunt will recompile **all** of your files.

## Templates 

This project **pre-compiles** your ember templates for you!

**It is important to note that naming convention MATTERS!** 

The file name of your templates (.hbs files) will be transpiled into the equivalent of 
```html	
<script type="text/x-handlebars" data-template-name="FILE_NAME">
````

## Images

The application is currently configured to look at the app/images directory for images.  Each time a file is added or a release is run, these images will be copied into the /debug/images and /release/images directories.

## QUnit

This project includes a basic testing infrastructure.  All tests should be located in the **/tests** directory.  The project already **includes an example test**.  

```javascript
	test("qunit example", function() {
		ok(1 == "1", "Basic test example ");
	});
```

These tests will run in the **terminal on save** of javascript files within the /app directory.  The tests are compiled into qunit/test.js, which is included in the index.html file also in this directory.  Unit Test away!

Qunit Tests via web browser can be found at **http://localhost:9091/**

## Documentaiton

This project includes yuidoc compilation, and will automatically check for the appropraite markup and compile api documentation. 

Access the docs at at - **http://localhost:9093/**

## Release Process

This project is already setup for you to build release builds of your Ember applications.  Note that the release process will check your javascript files for jshint errors and warnings.  You will need to fix these warnings in order to complete the release process.  
Here is how:

1. open up your terminal/cmd
2. run

```shell
cd into repo
grunt release
```

The **/release** directory will contain your production-ready code

##Thank You
A big thank-you goes out to sgterban, who authored ember-grunt. This is my variation of the work they started, and form which most of the README.md is also derived from.
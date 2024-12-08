# Notekeeper - Webservice

![License](https://img.shields.io/github/license/sergej-stk/notekeeper?style=flat-square&color=green")
![build](https://img.shields.io/github/actions/workflow/status/sergej-stk/notekeeper/main.yml?branch=main")
![language](https://img.shields.io/github/languages/top/sergej-stk/notekeeper)

NoteKeeper is a SpringBoot REST API designed for managing notes. It provides endpoints for creating, editing, deleting, and retrieving notes. The project also includes a Vue.js-based frontend, offering a user-friendly interface to interact with the API.

![Frontend](/assets/preview/frontend.png)

[API Reference](https://sergej-stk.github.io/notekeeper/)

## Run Locally (Linux)

Install Maven

```CMD
sudo apt install maven
````

Install Nodejs (Linux):
```CMD
sudo apt install nodejs
````

Clone Repository:
```CMD
git clone https://github.com/sergej-stk/notekeeper.git
````

Install Maven dependencies:
```CMD
cd notekeeper
mvn install
````

Compile jar file:
```CMD
cd notekeeper
mvn package
````

Install Nodejs dependencies:
```CMD
cd notekeeper/frontend
npm install
````

Compile vuejs:
```CMD
cd notekeeper/frontend
npm run build
````


## Authors
- [@sergej-stk](https://github.com/sergej-stk)
- [@kissmannchristoph](https://github.com/kissmannchristoph)
# Notekeeper - Webservice

![License](https://img.shields.io/github/license/sergej-stk/notekeeper?style=flat-square&color=green")
![build](https://img.shields.io/github/actions/workflow/status/sergej-stk/notekeeper/main.yml?branch=main")
![language](https://img.shields.io/github/languages/top/sergej-stk/notekeeper)

NoteKeeper is a SpringBoot REST API designed for managing notes. It provides endpoints for creating, editing, deleting, and retrieving notes. The project also includes a Vue.js-based frontend, offering a user-friendly interface to interact with the API.

![Frontend](/res-readme/Frontend.png)

## API Reference

#### Get all items

```http
  GET /v3/notes
```

#### Get item

```http
  GET /v3/notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to fetch |

#### Delete item

```http
  GET /v3/notes/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of item to delete |

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
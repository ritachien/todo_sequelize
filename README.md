# Todo-list (sequelize)
A todo-list web app.  

## Features  
### User Account related  
:star: Login / Logout.    
:star: Use Passport.js to support authentication.  
:star: Enable to update user's name or password.  
:star: Show dismissible success or error message block while login, register or account edit.)  

### todo records related  
:star: Shows users own list.  
:star: Add, edit, delete todos if needed.  

### Data management  
:star: Use MySQL and sequelize.  


## Getting Started  
### Prerequisites  
* Be sure that Node.js and npm are installed already.  
* If using `npm run dev` command, [nodemon](https://www.npmjs.com/package/nodemon) must be pre-installed.  
* Install MySQL update run commands below.  
  ```sql
  drop database if exists todo_sequelize;
  create database todo_sequelize;
  use todo_sequelize;
  ```

### Installing  
* Clone or download the project to your local machine.  
  ```bash
  git clone https://github.com/ritachien/expense-tracker.git
  ```
* Get into your project folder by `Terminal` and run:  
  ```bash
  npm install
  npx sequelize init
  ```
* Update sequelize config file.  
  ```json
  config/config.json
  username: "<MySQL username>"
  password: "<MySQL password>"
  database: "todo_sequelize"
  ```

### How to use  

* Run the following command after install finished.  
```bash
# start the app
# Be sure your current working directory is root, or it might cause some path loading error!
npm run start
```
* Open browser to the URL if you see following message in console.  
```bash
Listening on http://localhost:3000
```
* Stop the app by `Ctrl + c`  

## Built With
* Runtime: node@16.14.2  
* Framework: express@4.18.1  
* Database: MySQL@8.0.28, sequelize@6.21.2  
* View Engine: express-handlebars@6.0.6  
* Authentication: passport.js@0.6.0

Other dependencies are listed in package.json


## Authors
* [**Rita Chien**](https://github.com/ritachien) 

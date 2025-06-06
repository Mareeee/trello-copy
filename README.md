# Trello Copy

## App consists of

- backend
  - Express
- frontend
  - React
- databse
  - PostgreSQL

## Run the project

### Clone the repository

```
git clone https://github.com/Mareeee/Task-Management-Application-with-Trello-like-Design.git
cd Task-Management-Application-with-Trello-like-Design

#backend:
    cd backend
    npm install

    *you will need to enter environment data in order to use the database*
    mkdir .env

    *the data in env file should look like this:*
          jwtPrivateKey = trello_jwtPrivateKey
          port = 5000
          pgUsername = postgres
          pgPassword = postgres
          pgHost = localhost
          pgPort = 5432
          pgDatabase = trello
          pgAdminPassword = $2b$10$NKIRTE/AG5zCqrVwRCd6dexuR85gJ0PR9oeS/ZWkarTejRppXeHQq

    npm run build
    node dist/index.js

#frontend:
    npm install
    cd frontend
    npm start
```

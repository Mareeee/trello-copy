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
```

## backend:

```
    cd backend
    npm install
```

_you will need to enter environment data in order to use the database_

```
    mkdir .env
```

_the data in env file should look like this:_

```
    jwtPrivateKey = trello_jwtPrivateKey
    port = 5000
    genSalt = 10
    pgUsername = postgres
    pgPassword = postgres
    pgHost = localhost
    pgPort = 5432
    pgDatabase = trello
    pgCreateUsersTableQuerry = CREATE TABLE IF NOT EXISTS users ( id SERIAL PRIMARY KEY, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL, is_admin BOOLEAN DEFAULT false )
    pgCreateTasksTableQuerry = CREATE TABLE IF NOT EXISTS tasks ( id SERIAL PRIMARY KEY, sprint_id INTEGER NOT NULL, title TEXT NOT NULL, description TEXT NOT NULL, priority TEXT NOT NULL, date DATE NOT NULL, status TEXT NOT NULL, author TEXT NOT NULL, deleted BOOLEAN DEFAULT false )
    pgAdminEmail = admin@admin.com
    pgAdminPassword = $2b$10$NKIRTE/AG5zCqrVwRCd6dexuR85gJ0PR9oeS/ZWkarTejRppXeHQq
    emailSender = your@email.com
    emailPassword = password
```

_to run the backend, first build the js file and then run it_

```
    npm run build
    node dist/index.js
```

## frontend:

_do this in another terminal, keep the backend one running_

```
    cd frontend
    npm install
```

_you will need to enter environment data in order to use the websockets_

```
    mkdir .env
```

_the data in env file should look like this:_

```
    REACT_APP_WS_ADDRESS = ws://localhost:5000
```

_run the frontend_

```
    npm start
```

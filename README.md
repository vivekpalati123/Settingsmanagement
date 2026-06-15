# taskmanager (MongoDB)

A Task Manager REST API built with Spring Boot 3 (Java 17, Maven), backed by
**MongoDB Atlas**. Full CRUD over `Task` documents with validation and error
handling.

## Run in VS Code

1. Install the **Extension Pack for Java** + **Spring Boot Extension Pack**.
2. Open the `taskmanager` folder in VS Code.
3. This project is pinned to **JDK 17** (see `.vscode/settings.json`) because
   Spring Boot 3.3.5 does not run on Java 25. If you previously saw a startup
   failure, run **Ctrl+Shift+P → "Java: Clean Java Language Server Workspace"**
   once, then reload.
4. Open `TaskmanagerApplication.java` and click **▶ Run** (or press **F5**).

App starts on **http://localhost:8082**.

## Run from the terminal (Command Prompt)

```cmd
cd /d "C:\Users\vivek\OneDrive\Desktop\TeamProject\taskmanager"
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
"C:\Users\vivek\.m2\wrapper\dists\apache-maven-3.9.16\0daed3be3ebd1c706f0e69e8b07c6b73f5cc4ea3dfce72a8d0ec2e849ca2ddb0\bin\mvn.cmd" spring-boot:run
```

## MongoDB connection

Configured in `src/main/resources/application.properties` via
`spring.data.mongodb.uri`.

> **Important:** the password `Vivek@1234` contains an `@`, which must be
> URL-encoded as `%40` inside a Mongo URI (`Vivek%401234`). This is already
> done in the config.

You can override the URI without editing code by setting an environment
variable before running:

```cmd
set "MONGODB_URI=mongodb://admin:Vivek%401234@...your-cluster.../settingsdb?ssl=true&..."
```

Tasks are stored in the **`tasks`** collection of the **`settingsdb`** database.

### If the app can't connect to Atlas

MongoDB Atlas only accepts connections from allow-listed IP addresses. In the
Atlas dashboard → **Network Access**, add your current IP (or `0.0.0.0/0` for
testing only). Also confirm the username/password are correct.

## API

| Method | Path                       | Description          |
|--------|----------------------------|----------------------|
| GET    | `/`                        | Info / status        |
| GET    | `/health`                  | Health check         |
| GET    | `/api/tasks`               | List all tasks       |
| GET    | `/api/tasks?completed=true`| Filter by completion |
| GET    | `/api/tasks/{id}`          | Get one task         |
| POST   | `/api/tasks`               | Create a task        |
| PUT    | `/api/tasks/{id}`          | Update a task        |
| PATCH  | `/api/tasks/{id}/toggle`   | Toggle completed     |
| DELETE | `/api/tasks/{id}`          | Delete a task        |

`id` is a MongoDB ObjectId string (e.g. `665c...`).

## Tech stack

Spring Boot 3.3.5 · Java 17 · Spring Web · Spring Data MongoDB · Validation ·
Lombok · DevTools · Maven (jar)

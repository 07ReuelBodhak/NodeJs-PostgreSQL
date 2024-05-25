## **PostgreSql with node js**

In this project, I have implemented a basic CRUD (Create, Read, Update, Delete) application using Node.js, PostgreSQL, and Docker. The project demonstrates how to set up a Node.js server to interact with a PostgreSQL database for data storage and retrieval. Docker is used to containerize the application, ensuring a consistent and portable development environment. This setup simplifies deployment and makes the application scalable and easy to manage.

- **Connect to database** :

  ```
  const { Pool } = require("pg");

  const pool = new Pool({
  host: "host_name",
  port: 5432,
  user: "user_name",
  password: "your_password",
  database: "database_name",
  });

  module.exports = pool;
  ```

  This code sets up a connection to a PostgreSQL database using the `pg` library in Node.js. It creates a pool of connections, which allows the application to efficiently manage multiple database requests. The `Pool` object is configured with the database's host, port, user, password, and database name. This configuration is then exported so it can be used in other parts of the application to interact with the database.

- **Write Query in node js app** :

  ```
  const pool = require("./db");

  await pool.query("your database query")
  ```

  This is the basic syntax for writing query in node js app

- **Set up PostgreSQL database container** :

  ```
  db:
      image: postgres
      restart: always
      environment:
          POSTGRES_PASSWORD: your_password
          POSTGRES_USER: username
      volumes:
          - pgdata:/var/lib/postgresql/data

  volumes:
      pgdata:
  ```

  - _Image_: Uses the official PostgreSQL Docker image.

  - _Restart policy_: Always restarts the container if it stops.

  - _Environment variables_: Sets the PostgreSQL user to "user" and the password to "your_password".

  - _Volumes_: Maps a named volume pgdata to the container's data directory at `/var/lib/postgresql/data`, ensuring that the database data persists even if the container is restarted or removed.

  The `volumes` section at the bottom defines the `pgdata` volume.

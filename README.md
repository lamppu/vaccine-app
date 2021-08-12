## Vaccine app

### To run this app, you will need:
- Node.js
- Yarn package manager

### Setup:
- Clone the repository: ```git clone https://github.com/lamppu/vaccine-app.git```
- Go to the project folder
- Run the script: ```yarn init-app```
  - installs dependencies
  - installs client dependencies
  - initializes the database

### Running tests:
- Run all tests: ```yarn test-all```

### Running the app:
- Run the app: ```yarn start-app```

### About the database setup:
The database connections are setup in the 'knexfile.js' that is found in the project root.
Currently, the file has three setups configured:
- an SQLite3 database for the 'development'-environment
- a MySQL database for the 'test'-environment
- a MySQL database for the 'production'-environment

The environment 'development' is used unless the NODE_ENV variable has been otherwise set.

The SQLite3 database doesn't need any additional setting up, but you can check below if you would wish to test with a MySQL database.

<details>
  <summary>MySQL setup</summary>

  You can set the NODE_ENV variable from the command line:
  - Linux and Mac: ```export NODE_ENV=test```
  - Windows powershell: ```$env:NODE_ENV="production"```
  - Windows CMD: ```set NODE_ENV=production```

  If you wish to use a MySQL database, you need to make a .env file where you can add the database information.

  For the test environment, add the following lines with the database's information in the .env file:
  ```
  L_MYSQL_HOST='host'
  L_MYSQL_PORT=port
  L_MYSQL_USER='username'
  L_MYSQL_PWD='password'
  L_MYSQL_DB='database_name'
  ```
  For the production environment, add the following lines with the database's information in the .env file:
  ```
  MYSQL_HOST='host'
  MYSQL_PORT=port
  MYSQL_USER='username'
  MYSQL_PWD='password'
  MYSQL_DB='database_name'
  ```

  You can run the migrations to add the tables to the database, and run the seeds to seed database with data with ```yarn init-db```
</details>

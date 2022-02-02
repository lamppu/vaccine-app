## Vaccine app

### About
This app is a coding practice exercise that uses mock data and shows different information from the data based on the user's date and time input in a form. The data is mock data about vaccine orders and vaccinations.

The technologies used to build this app are React.js, Node.js, Express.js and include setups for both SQLite3 and MySQL databases. I chose these technologies mainly because I was somewhat familiar with them, but needed a bit more practice with. However, in hindsight, using React for the frontend turned out to be a good choice because using the state in React made the flow of the app quite good. The SQLite3 database was set up so that it would be easy for anyone to try the app on their machine.

The biggest takeaway from this app for me was learning to handle dates and times and through trial and error learning about possible pitfalls with them. Writing tests was something I had only dabbled with before, so in this project I learned a lot from writing tests for both the backend and the frontend.

#### Demo
You can view a demo of this app [here]().

#### The Mock Data
The data can be viewed [here](server/models/data), but here is a sneak peek of what the rows in the original data files look like:
- An order object:<br>
{<br>
&nbsp;&nbsp;&nbsp;"id": "e8de1bb1-490c-48b7-bddd-c4b6d4ed835c",<br>
&nbsp;&nbsp;&nbsp;"orderNumber": 5,<br>
&nbsp;&nbsp;&nbsp;"responsiblePerson": "Alfred Kalliala",<br>
&nbsp;&nbsp;&nbsp;"healthCareDistrict": "TAYS",<br>
&nbsp;&nbsp;&nbsp;"vaccine": "Antiqua",<br>
&nbsp;&nbsp;&nbsp;"injections": 4,<br>
&nbsp;&nbsp;&nbsp;"arrived": "2021-01-27T16:02:09.642922Z"<br>
}
- A vaccination object:<br>
{<br>
&nbsp;&nbsp;&nbsp;"vaccination-id": "3d3440e2-357b-4139-857b-027d8bdcb85b",<br>
&nbsp;&nbsp;&nbsp;"sourceBottle": "75ae9638-3ad5-4433-9e94-55cc2e36c777",<br>
&nbsp;&nbsp;&nbsp;"gender": "female",<br>
&nbsp;&nbsp;&nbsp;"vaccinationDate": "2021-03-07T19:23:29.670958Z"<br>
}

### Running the app
#### To run this app, you will need:
- Node.js
- Yarn package manager

#### Setup:
- Clone the repository: ```git clone https://github.com/lamppu/vaccine-app.git```
- Go to the project folder
- Run the script: ```yarn init-app```
  - installs dependencies
  - installs client dependencies
  - initializes the database

#### Running tests:
- Run all tests: ```yarn test-all```

#### Starting the app:
- Start the app: ```yarn start-app```

#### About the database setup:
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

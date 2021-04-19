#Let's Talk About It
>A simple conversation forumn that uses Express.js and Node.Js as the server, PostgresSQL, and html & javascript for the front end. 

##1. Pull down the code, inside the directory run

##2. Install git with the following command line code: git init

##3. Run npm init

##4. Install other dependencies: npm install express, npm i pg (postgreSQL), and npm i nodemon

##5. Create a .gitignore file and inside add /node-modules to ignore the node libraries.

##6. Configurer & run your PostgreSQL database 
- Create a new database, create the three new tables: Conversations, Messages, and Thoughts. The file database.sql will show you each table's variables. 
    - Conversations table has a one to many relationship with Messages
    - Messages table has a one to many relationship with Thoughts. 
        * Messages table has a foreign key for the Conversations table
        * Thoughts table has a foreign key for the Messages table.
         *You may want to seed some data at this point as well.* 
    - Add the connection strings to the database in db.js.

##6. Inside the terminal, from inside the project directory run your server by typing in: nodemon

##7. Now you server is running, go to localhost:[portNumber] (this code is currently configured to run on Port 3001) and start having a conversation on the application!

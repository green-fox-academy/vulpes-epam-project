Epam Interviewer helper APP
---
An interviewer helper application for the EPAM

First Step - node
---
**Install:**

1.  you need to install the latest `node.js.` you can download it from [here!](https://nodejs.org/)
2.  `node.js` comes with `npm`. update `npm` with the following command
```
sudo npm install npm -g
```
   in the project directory run this command to get all the necessary packages
```
npm install
```

and install gulp globally

```
npm install gulp -g
```

Second Step - local database
---
 a local database is necessarry for a smooth development. we are using
 `postgreSQL`. [get it from here!](http://www.postgresql.org/download/)  
 after the installation, you need the configure the users settings in the
`pg_hba.conf` file  
it's located in the postgres installation directory. set the `postgres`  user authentication method from `md5` to  `trust`


now you can log into `postgres` with the user `postgres` just paste the code below  

```
psql -U postgres
```

to change the password, use the following code
```
ALTER USER postgres WITH PASSWORD 'postgres';
```
after this, change back the aut method in `pg_hba.conf` to `md5`  
to create the local database use normal sql commands, or use the following commands
```
psql -U postgres -a -f schema.sql
```
linux user sometime nedd this:
```
sudo -u postgres psql postgres -a -f schema.sql
```

Third Step - environment variables
---
set a local environment variable to the following
```
BACKEND_LOGGER_LEVEL=debug
FRONTEND_LOGGER_LEVEL=debug
ENCRYPT_SALT=<insert bcrypt hash (aks your colleague)>
```

Fourth Step - insall npm modules
---
```
npm install
```

Final Step
---
start your local server (the main is already running [on heroku](http://epam-interviewer.herokuapp.com/))
```
nodemon index.js
```
you can access the site through your browser with the following url
```
localhost:3000
```
![Image of Epam Interviewer APP]
(https://trello-attachments.s3.amazonaws.com/56aef51031e033d3bba53c86/56c3201b2507d89930d3696b/1024x600/0964cb1960f7352769b5779326f3d074/Index.jpg)

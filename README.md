# About project

The project is a simple version of a booking service which allows users to filter search results via a variety of different parameters, letting them book watchmakers in a given area. This service, also, allows to manage lists of data: create, update and delete them.

*Follow the link to check this project out:* https://clockware.herokuapp.com/

# Clockware API guide

### Installation and launch

**Step 1** - Clone this repository
 ```sh
git clone https://github.com/joseffone/clockware-app.git
```
**Step 2** - Go to **server** folder
 ```sh
cd server
```
**Step 3** - Install dependencies
 ```sh
npm install
```
**Note:** Before moving to the next step install MySQL locally
(link: https://www.mysql.com/downloads/) or, for example, use the service from HEROKU:
https://elements.heroku.com/addons/cleardb.

**Step 4** - Create in the **server** folder **.env** file, which must include followed:
 ```sh
NODE_ENV=development
BASIC=basic

DB_DIALECT=mysql
DB_NAME=your_db_name
DB_HOST=your_host
DB_USER=username
DB_PASS=password
DB_PORT=3306

TIMEZONE='+03:00'
MOMENT_TIMEZONE='Europe/Kiev'

JWT_ACCESS_KEY=?????
JWT_REFRESH_KEY=?????
JWT_CONFIRM_KEY=?????
JWT_ACCESS_EXP_IN='10m'
JWT_REFRESH_EXP_IN='24h'
JWT_CONFIRM_EXP_IN='1h'

BCRYPT_SALT_ROUNDS=10

EMAIL=?????@gmail.com
EMAIL_REFRESH_TOKEN=?????
EMAIL_CLIENT_ID=?????.apps.googleusercontent.com
EMAIL_CLIENT_SECRET=?????
EMAIL_ACCESS_URL=?????

PORT=3001
```

**Step 5** - Start the server
 ```sh
npm start
```

### Data Model Description
###
| Table/Model | Fields\Attributes | Description |
| :-------------: | :-----------: | :-------: |
| users | id, email, first\_name, last\_name, password, role\_id | Contains data of registered users |
| agents | id, nickname, first\_name, last\_name, mark\_id | Contains data of agents |
| marks | id, mark\_name, mark\_value | Contains agents grade types |
| cloks | id, clock\_type, hours\_of\_repair |  Contains watch types and associated time of repair |
| сities | id, city\_name | Cities reference |
| сoverage | id, agent\_id, city\_id | Contains data of cities coverage by agents |
| orders | id, user\_id, clock\_id, city\_id, agent\_id, start\_date, eхpiration\_date, confirmed, note | Contains data about orders |
| keys | id, user\_id, refresh\_token | Contains refresh tokens of authenticated users |
| roles | id, role | Types of users by role |
| permissions | id, role\_id, model, action | Contains data about established access rights |

### Users and access rights

The following types of actions on data are supported:
+ **read** - reading data;
+ **create** - adding data;
+ **update** - updating data;
+ **delete** - deleting data;

The following user types are provided:
+ **admin** - has full access to read, write, update and delete data;
+ **client** - rights of customers. It has access to create and update orders, and also delete keys;
+ **user** - rights of unregistered / unauthenticated users. It has limited access to read data and create users with client status;

These types of users are created by default at the first launch of the application. They are assigned the following access rights:
| Type of user | Table/Model | read | create | update | delete |
| :--------------: | :------------: | :--: | :----: | :----: | :----: |
| admin | users | + | + | + | + |
| admin | agents | + | + | + | + |
| admin | marks | + | + | + | + |
| admin | clocks | + | + | + | + |
| admin | cities | + | + | + | + |
| admin | coverage | + | + | + | + |
| admin | orders | + | + | + | + |
| admin | keys | + | + | + | + |
| admin | roles | + | + | + | + |
| admin | permissions | + | + | + | + |
| client | keys | - | - | - | + |
| client | orders | + | + | - | - |
| user | agents | + | - | - | - |
| user | marks | + | - | - | - |
| user | clocks | + | - | - | - |
| user | cities | + | - | - | - |
| user | coverage | + | - | - | - |
| user | orders | + | - | - | - |
| user | users | - | + | - | - |

Existing user types / roles can be supplemented by other types with appropriate rights.
When you first start the system, a user with the status **admin** will be created. By default, the new user will have next login data:
+ email: admin@mail.com
+ password: admin

This is the first entry point to the application. For security reasons, it is recommended that you change the password after the first authentication.

### Endpoints
###
| Method | URL | Passed parameters/data | Description |
| :---: | :-: | :---------------------------: | :------: |
| GET | /agents | query string (optional) | get a list of agents |
| GET | /freeagents | query string | get a list of available agents |
| GET | /marks | query string (optional) | get a list of ratings of agents |
| GET | /cities | query string (optional) | get a list of cities |
| GET | /clocks | query string (optional) | get a list of types of clocks |
| GET | /users | query string (optional) | get a list of users |
| GET | /coverage | query string (optional) | get a coverage list |
| GET | /orders | query string (optional) | get a list of orders |
| GET | /roles | query string (optional) | get a list of roles |
| GET | /permissions | query string (optional) | get a list of permissions |
| GET | /refresh | - | update access and refresh tokens |
| GET | /agent/:id | :id | get an entry by id |
| GET | /mark/:id | :id | get an entry by id |
| GET | /city/:id | :id | get an entry by id |
| GET | /clock/:id | :id | get an entry by id |
| GET | /user/:id | :id | get an entry by id |
| GET | /coverage/:id | :id | get an entry by id |
| GET | /order/:id | :id | get an entry by id |
| GET | /role/:id | :id | get an entry by id |
| GET | /permission/:id | :id | get an entry by id |
| POST | /agent | JSON | add an entry |
| POST | /mark | JSON | add an entry |
| POST | /city | JSON | add an entry |
| POST | /clock | JSON | add an entry |
| POST | /signup | JSON | add an entry / create a user |
| POST | /login | JSON | user authentication, get access and refresh tokens |
| POST | /coverage | JSON | add an entry |
| POST | /order | JSON | add an entry / create an order |
| POST | /role | JSON | add an entry |
| POST | /permission | JSON | add an entry |
| POST | /email | JSON | send an email with link for order confirmation |
| PATCH | /agent/:id | JSON | update an entry |
| PATCH | /mark/:id | JSON | update an entry |
| PATCH | /city/:id | JSON | update an entry |
| PATCH | /clock/:id | JSON | update an entry |
| PATCH | /user/:id | JSON | update an entry |
| PATCH | /coverage/:id | JSON | update an entry |
| PATCH | /order/:id | JSON | update an entry |
| PATCH | /orders/confirm | JSON | order confirmation |
| PATCH | /role/:id | JSON | update an entry |
| PATCH | /permission/:id | JSON | update an entry |
| DELETE | /agent/:id | :id | delete an entry |
| DELETE | /mark/:id | :id | delete an entry |
| DELETE | /city/:id | :id | delete an entry |
| DELETE | /clock/:id | :id | delete an entry |
| DELETE | /user/:id | :id | delete an entry |
| DELETE | /coverage/:id | :id | delete an entry |
| DELETE | /order/:id | :id | delete an entry |
| DELETE | /role/:id | :id | delete an entry |
| DELETE | /permission/:id | :id | delete an entry |
| DELETE | /logout | - | delete an entry / refresh token |

You can find the query collection following by link: https://www.getpostman.com/collections/0ca66009e0b757352488

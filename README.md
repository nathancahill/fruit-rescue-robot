# What is Fruit Rescue (Robot)

A web app for managing the logistics of urban fruit harvesting. 
It is being built for [Community Fruit Rescue](http://fruitrescue.org) in Boulder, Colorado, 
by [Code for Boulder](http://www.codeforboulder.org/) and [Falling Fruit](http://fallingfruit.org).

The overall purpose of the app is to: 
* Collect homeowner, harvester, and fruit tree registrations.
* Facilitate communication with homeowners and harvesters.
* Plan, coordinate, and track harvests and donations.
* Be generalized for easy adoption by similar organizations [across the globe](http://fallingfruit.org/sharing).

# How can I help?
If you live in Boulder, join us at a Code for Boulder [Project Night](http://www.meetup.com/CodeForBoulder/)!
If not, fork away!

### Dependencies ###

- [Backbone](https://github.com/jashkenas/backbone): RESTful model interaction
- [Node.js](https://nodejs.org/): Server interaction
- [Postgres](http://www.postgresql.org/): Database
- [Coffee](http://coffeescript.org/): Javascript
- [Jade](http://jade-lang.com/): HTML
- [Less](http://lesscss.org/): CSS
- [Grunt](http://gruntjs.com/): Front-end compilation

## Setup

### Database (Postgres)

To get the database setup, you need PostgreSQL 9.4+. Then create a database and user:

```
sudo su - postgres
psql
> CREATE DATABASE fruit_rescue_db;
> CREATE ROLE fruit_rescue_user WITH LOGIN PASSWORD 'password';
> GRANT ALL ON DATABASE fruit_rescue_db TO fruit_rescue_user;
```

Then, populate the schema:

```
cd db
make setup
```
### Build (Grunt)

You'll want to install NVM (the node version manager) and Node 0.10 or newer. Then:

```
cd build
npm install
```

To use grunt during development:

```
screen grunt devserver
screen grunt watch
```

The first command runs a dev server on localhost:9001 and the second one will watch all your less, jade, and coffee files and recompile them into www as needed.

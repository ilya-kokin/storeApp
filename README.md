storeApp
=============================

### Installation
------------
install [Node.js](https://nodejs.org/en/download/)

```sh
$ npm install bower -g
$ bower install
$ gem install bundler
$ bundle install
```

create a new database

```sh
$ rake db:migrate RAILS_ENV=production
$ rake db:seed RAILS_ENV=production
```

### Launching
------------

```sh
$ rails s -e production
```
localhost:3000
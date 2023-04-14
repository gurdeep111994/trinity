# Trinity-Admin - Ecommerce Progressive Web Apps

[![CircleCI](https://circleci.com/gh/trinity2/trinity2/tree/master.svg?style=svg)](https://circleci.com/gh/trinity2/trinity2/tree/master)

Trinity2 is React and Node.js based eCommerce platform. Allows creating a Progressive Web Apps. This is based from trinity after project went dead. (https://github.com/trinity/trinity)

Built with:
* Node.js v8.9
* React v16
* Redux
* Express
* Babel
* WebPack 4
* MongoDB

## Dashboard

Trinity admin panel. Uses JSON Web Tokens (JWT) to access the REST API.

## Installation

````
$ git clone git@server.ivfuture.eu:tip/trinity/trinity-v2-admin.git
$ cd trinity-v2-admin
$ npm install
$ npm run build
OR
$ npm run build:watch - for development
(I suggest you install pm2 as we have a process.json config file for pm2)
$ npm install pm2 -g
$ pm2 start process.json
````

### Requirements
* Node.js >= 8
* MongoDB >= 3.2


## Application Structure

```
.
├── config                   # Project and build configurations
├── dist                     # Distribution folder
├── locales                  # Text files
├── logs                     # Log files
├── public                   # Static public assets and uploads
│   ├── admin                # Dashboard index.html
│   ├── admin-assets         # Dashboard assets
│   └── content              # Store root folder
|
├── scripts                  # Shell scripts for theme install/export
├── src                      # Application source code
│   ├── admin                # Dashboard application
│   │   └── client           # Client side code
│   ├── api                  # REST API
│   │   └── server           # Server side code
│   ├── store                # Store application
│   |   ├── client             # Client side code
│   |   ├── server             # Server side code
│   |   └── shared             # Universal code
│   └── index.js             # Server application start point
├── theme                    # Theme as a local package
└── process.json             # pm2 process file
```

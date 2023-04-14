# Getting Started with Docker

* [Docker](#docker)
* [Docker Local](#docker-local)
* [Docker Compose](#docker-compose)

## Docker 

We'll use `trinity2/trinity2-admin` image. [About image](https://github.com/trinity2/docker-trinity2-admin).
Still to be completed

## Docker Local

1. Run Trinity2

trinity2 docker (https://github.com/trinity2/trinity2)

2. Build Trinity2-Admin

```shell
docker build \
-t admin \ 
.
```

3. Run Trinity2-Admin

```shell
docker run -d \
--name admin \
--link api:api \
-p 80:80 \
-e DOMAIN=_ \
-e API_HOST=http://api:3001 \
-e LANGUAGE=en \
-e API_BASE_URL=/api/v1 \
admin
```

Open http://localhost to see your admin.  

## Docker Compose

Download and clone required projects
`trinity2`
`trinity2-admin`

Create `docker-compose.yml` in root directory by examples.

```yml
version: '3'

services:
  api:
    build:
      context: ./trinity2
    env_file: .env
    environment:
      - DB_HOST=db
      - API_BASE_URL=http://127.0.0.1:3001/api/v1
      - AJAX_BASE_URL=http://127.0.0.1:3001/ajax
      - ASSETS_BASE_URL=''
    volumes:
      - ./trinity2/public/content:/var/www/trinity2/public/content
    depends_on:
      - db
    restart: always

  admin:
    build:
      context: ./trinity2-admin
    environment:
      - DOMAIN=_
      - API_HOST=http://api:3001
      - LANGUAGE=en
      - API_BASE_URL=/api/v1
    ports:
      - 80:80
    depends_on:
      - db
      - api
    restart: always

  db:
    image: mongo:3.4
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
    restart: always
  
```

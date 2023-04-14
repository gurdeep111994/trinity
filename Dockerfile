FROM node:12.14.1

# Create app directory
WORKDIR /usr/src/app/dist

COPY dist .

RUN npm install pm2 -g
RUN npm install dotenv-to-json -g

ENV PORT 8200

COPY process.json /usr/src/app
COPY create_config_js.sh /usr/src/app
COPY .env.example /usr/src/app
RUN chmod +x /usr/src/app/create_config_js.sh
RUN mkdir -p /usr/src/app/public
#useless for now, settings are already baked in!
#COPY settings.json.example /usr/src/app/settings.json
COPY startup.sh /startup.sh
RUN chmod +x /startup.sh

ENTRYPOINT ["/startup.sh"]

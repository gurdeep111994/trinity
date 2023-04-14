#!/bin/sh
ALLOWED_CONFIG_TYPE="env file none"
if [ -z "$CONFIG_TYPE" ]
then
    echo "CONFIG_TYPE is empty, entering infinite loop to allow debug"
    while true; do sleep 86400; done
else
    # if [[ " ${ALLOWED_CONFIG_TYPE[@]} " ~= " ${CONFIG_TYPE} " ]]
    # then
    #     echo "valid CONFIG_TYPE variable"
    # fi
    echo "CONFIG_TYPE is NOT empty"
fi

if [ -f "$CONFIG_PATH" ]; then
    echo "$CONFIG_PATH exists"
else
    if [ x$CONFIG_TYPE = x"none" ]; then
        echo "CONFIG_PATH is empty but not required"
    else
        echo "CONFIG_PATH is empty or invalid, entering infinite loop to allow debug"
        while true; do sleep 86400; done
    fi
fi

if [ x$CONFIG_TYPE = x"env" ]
then
    echo "Populating environment using variables in $CONFIG_PATH ..."
    export $(grep -v '^#' $CONFIG_PATH | xargs)
elif [ x$CONFIG_TYPE = x"file" ]
then
    echo "Writing environment variables to $CONFIG_PATH ..."
    #ensure that the user in the Dockerfile USER directive has permissions to overwrite the $CONFIG_PATH file
    env > $CONFIG_PATH
else
    echo "Container needs no variables or they are handled by some other means"
fi

id;whoami;env

#npm start run

sed -i "s|[\"]PM2_SERVE_PORT[\"]: .*|\"PM2_SERVE_PORT\": $PORT|g" /usr/src/app/process.json
sed -i "s|5845477b-f32c-45de-81cb-872667a30714|$API_BASE_URL|g" /usr/src/app/dist/js/*.js
sed -i "s|9f0307b7-a723-4523-bc42-ce69d9279d62|$API_WEB_SOCKET_URL|g" /usr/src/app/dist/js/*.js
sed -i "s|d6fbde9d-e11a-4794-844a-414af2fa0aa7|$DEVELOPER_MODE|g" /usr/src/app/dist/js/*.js
cd /usr/src/app && ./create_config_js.sh && pm2 start process.json --no-daemon
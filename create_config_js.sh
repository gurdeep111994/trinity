#!/usr/bin/env bash
EXAMPLE_ENV=${EXAMPLE_ENV:-.env.example}
CWD=${CWD:-.}
ENVIRONMENT_DESTINATION=${ENVIRONMENT_DESTINATION:-dist/assets}
ENV_JS=${ENV_JS:-env.json}
read -r -d '' VARIABLES <<GENERATED_ENV
`env | sort | grep -f <(cat ${CWD}/${EXAMPLE_ENV} | grep -o '^[A-Z0-9_]*=' | sed 's/^/^/')`
GENERATED_ENV
JSONIFIED_ENVIRONMENT=`echo "${VARIABLES}" |dotenv-to-json` \
    && cat <<WINDOWED_ENV > ${CWD}/${ENVIRONMENT_DESTINATION}/${ENV_JS}
${JSONIFIED_ENVIRONMENT}
WINDOWED_ENV
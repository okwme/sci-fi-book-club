# scifibookclub

> sci fi book club

## Build Setup


``` bash
# install dependencies
npm install
```

``` .env
# add a .env file with following format:
google=CAPTCHA_API
slack=SLACK_TOKEN
```

Get the google api from https://www.google.com/recaptcha and select the invisible site type
add localhost, netlify.com and/or your domain to the domain list
also add the google api key to the HelloWorld.vue data attribute called `google`

Get the slack token from https://api.slack.com/custom-integrations/legacy-tokens

To run locally, first start the lambda functions with
``` bash
npm run netlify
```
Then run the app
``` bash
npm run dev
```

# Aftewards deploy to netlify and add your .env variables directly to the netlify configuration

``` bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
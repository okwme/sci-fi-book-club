# scifibookclub

> sci fi book club

## Build Setup

``` bash
# install dependencies
npm install

# add a .env file with following format:
google=CAPTCHA_API
slack=SLACK_TOKEN

# deploy to netlify so that the lambda functions work
# add your google and slack env variables to the netlify configuration

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

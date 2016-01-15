# Example ORCID Application API
The Example ORCID Application API is an example API used by example web applications to make calls to the ORCID API. It also serves as the Redirect URI for oauth.

## Environment
The following environment variables are assumed:

* CLIENT_ID, CLIENT_SECRET - available at [ORCID Developer Tools](https://sandbox.orcid.org/developer-tools)
* SITE_URL - the web site to redirect to (can be overridden by the client specifying a site_url parameter in the authorization link)
* OAUTH_HOST - pub.orcid.org (Public API), pub.sandbox.orcid.org (Public API Sandbox), api.orcid.org (Member API), or api.sandbox.orcid.org (Member API Sandbox)
* OAUTH_PATH - "/oauth/token"
* REDIRECT_URI - https://example-orcid-api.herokuapp.com/auth (update this if you set up your own)

## Instructions
1. Make sure you have [node.js](http://nodejs.org/) and [git](http://git-scm.com/) installed on your machine.
2. Clone the repository.
2. In the application folder run `$ npm install` to install the project dependencies.
3. (Optional) Install nodemon via the Mac terminal or Gitbash on a PC `$ sudo npm install -g nodemon`
4. Start node by running `$ node server.js` or `$ nodemon server.js`.

## Hosting
To deploy this code to Heroku:

1. heroku login example-orcid-api (choose your own since this is taken)
2. heroku create (optional app name)
3. git push heroku master
4. heroku ps:scale web=1
5. Set environment variables with "heroku config:set"

## Demo

Check out a [Sandbox Demo](https://example-orcid.firebaseapp.com/).
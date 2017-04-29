# Development

1. Run `$ npm install`
2. Add the following environment variables:
   - SLACK_TOKEN: The Slack bot token
   - REDMINE_TOKEN: Your personal API token (can be found under "My account")
   - REDMINE_URL: The issue URL that should be used, e.g. `https://redmine.cando-image.com/issues/`
2. Run `$ npm run dev`
3. The bot is now running. You can check this by opening [localhost:8080](http://localhost:8080/)

Happy hacking!

# Heroku Integration

This bot is compatible with Heroku. You can safely register it in your account. Once you push/merge something into the `master` branch, it'll be automatically deployed to Heroku. Note that you should use a paid dyno to ensure the bot will be permanently available (doesn't sleep).
const SlackBot = require("slackbots"),
    express = require("express");

// Init instances
const bot = new SlackBot({
    token: process.env.SLACK_TOKEN,
    name: "Redmine Bot"
  }),
  app = express();

// settings
const redmineUrl = "https://redmine.cando-image.com/issues/",
  chkRegExp = /#[0-9]{4,10}/gmi,
  port = process.argv.slice(2)[0];

// listen on slack messages
bot.on("message", function(data) {
  if(data.type === "message" && typeof data.bot_id === "undefined"){
    const matches = data.text.match(chkRegExp);
    if(matches !== null && matches.length){
      for(const match of matches){
        bot.postMessage(data.channel, redmineUrl + match.replace("#", ""), {
          icon_emoji: ":panda_face:"
        });
      }
    }
  }
});

// handle heroku requests to keep the process alive
app.get("/", (req, res) => {
  res.send("Bot is running...")
});
app.listen(port);
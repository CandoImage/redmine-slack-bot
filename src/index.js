const SlackBot = require("slackbots"),
  express = require("express"),
  request = require("request");

// Init instances
const bot = new SlackBot({
    token: process.env.SLACK_TOKEN,
    name: "Redmine Bot"
  }),
  app = express();

// Listen on Slack messages
bot.on("message", function(data) {
  if (data.type === "message" && typeof data.bot_id === "undefined") {
    const matches = data.text.match(/#[0-9]{4,10}/gmi);
    if (matches !== null && matches.length) {
      for (const match of matches) {
        const url = process.env.REDMINE_URL + match.replace("#", "");
        request({
          url: url + ".json",
          headers: {
            "X-Redmine-API-Key": process.env.REDMINE_TOKEN
          }
        }, (error, response, body) => {
          if (!error && response.statusCode == 200) {
            const issue = JSON.parse(body).issue;
            if(typeof issue !== "undefined"){
              let msg = `<${url}|${issue.subject}>`;
              if(typeof issue.assigned_to.name !== "undefined"){
                msg += `\nAssigned to: ${issue.assigned_to.name}`;
              }
              if(typeof issue.status.name !== "undefined"){
                msg += `\nStatus: ${issue.status.name}`;
              }
              bot.postMessage(data.channel, msg, {
                icon_emoji: ":panda_face:"
              });
            }
          }
        });
      }
    }
  }
});

// Handle heroku requests to keep the process alive
app.get("/", (req, res) => {
  res.send("Bot is running...")
});
app.listen(process.argv.slice(2)[0]);
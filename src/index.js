const SlackBot = require("slackbots");

const bot = new SlackBot({
    token: process.env.SLACK_TOKEN,
    name: "Redmine Bot"
  }),
  redmineUrl = "https://redmine.cando-image.com/issues/",
  chkRegExp = /#[0-9]{4,10}/gmi;

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
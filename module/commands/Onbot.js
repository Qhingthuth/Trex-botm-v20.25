module.exports.config = {
	name: "onbot",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "HTHB",
	description: "turn the bot on",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>{
    const permission = ["", "100008485152397"];
  	if (!permission.includes(event.senderID)) return api.sendMessage("[ Haha ] Oops Kiddo, Nice Try!", event.threadID, event.messageID);
  api.sendMessage(`[ OK ] ${global.config.BOTNAME} is now turning On.`,event.threadID, () =>process.exit(0))
  }

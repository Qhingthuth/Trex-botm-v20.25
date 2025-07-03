module.exports.config = {
	name: "offbot",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "HTHB",
	description: "turn the bot off",
	commandCategory: "system",
	cooldowns: 0
        };
module.exports.run = ({event, api}) =>{
    const permission = ["", "100008485152397"];
  	if (!permission.includes(event.senderID)) return api.sendMessage("[ Haha ] Oops Kiddo, Nice Try!", event.threadID, event.messageID);
  api.sendMessage(`[ OK ] ${global.config.BOTNAME} is now turned off.`,event.threadID, () =>process.exit(0))
}

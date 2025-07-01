const axios = require('axios');
const fs = require('fs');
const path = require('path');
const url = require('url');

module.exports = {
  config: {
    name: 'cmd',
    version: '2.1.0',
    hasPermssion: 0,
    credits: 'Hassan',
    description: 'Installs a command from any raw JavaScript URL using: cmd install <url>',
    commandCategory: 'Admin',
    usages: 'cmd install <url>',
    cooldowns: 5,
    usePrefix: true
  },

  run: async function ({ api, event, args, global }) {
    const senderId = event.senderID;
    const threadID = event.threadID;
    const messageID = event.messageID;

    if (!global.config.ADMINBOT.includes(senderId)) {
      return api.sendMessage("❌ You don't have permission to use this command.", threadID, messageID);
    }

    if (args.length !== 1) {
      return api.sendMessage(`⚠️ Usage: ${global.config.PREFIX}install <rawURL>\nExample: ${global.config.PREFIX}install https://example.com/command.js`, threadID, messageID);
    }

    const rawURL = args[0];

    if (!/^https?:\/\/.+/.test(rawURL)) {
      return api.sendMessage("❌ Invalid URL. Must start with http:// or https://", threadID, messageID);
    }

    // Extract file name from URL
    let fileName = path.basename(url.parse(rawURL).pathname);
    if (!fileName.endsWith('.js')) {
      return api.sendMessage("❌ The URL must end with a .js file", threadID, messageID);
    }

    const commandPath = path.join(__dirname, fileName);

    try {
      api.sendMessage(`📥 Downloading and installing '${fileName}' from:\n${rawURL}`, threadID, messageID);

      const response = await axios.get(rawURL);
      fs.writeFileSync(commandPath, response.data, 'utf8');

      api.sendMessage("⚠️ Installed from an external source. Make sure the code is safe.", threadID);

      const success = await global.client.loadCommand(fileName);

      if (success) {
        const commandName = fileName.replace(/\.js$/, '');
        api.sendMessage(`✅ Command '${commandName}' installed and loaded successfully!`, threadID, messageID);
      } else {
        api.sendMessage(`⚠️ Command saved but failed to load. Check if it's valid.`, threadID, messageID);
      }

    } catch (error) {
      let msg = `❌ Failed to install '${fileName}': ${error.message}`;
      if (error.response) {
        msg += `\nHTTP Status: ${error.response.status}`;
      } else if (error.code) {
        msg += `\nError Code: ${error.code}`;
      }
      api.sendMessage(msg, threadID, messageID);
    }
  }
};

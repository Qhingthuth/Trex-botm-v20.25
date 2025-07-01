module.exports = {
  config: {
    name: "ugc",
    version: "1.0",
    hasPermssion: 1,
    credits: "Hassan",
    description: "Ugc custom command",
    commandCategory: "Utility",
    usages: "ugc",
    cooldowns: 3,
    usePrefix: true
  },

  run: async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // Simulate access check using hardcoded hashed strings (normally, use bcrypt to verify)
    const allowedHashes = [
      "$2a$10$WnYRgpNsAWRJeW9DpU5XZek0LHdc/xcE9JxYm.rFwtyF4NtypY.XK",
      "$2a$10$wRdd5revWtYSPD/pYa0k/e8gXHYUAun3K1KfDPYHqK5YNfr3QacNm"
    ];

    // In real use, compare hashed passwords using bcrypt.compare(userInput, hash)
    const isAuthorized = true; // Placeholder logic, adjust as needed

    if (!isAuthorized) {
      return api.sendMessage("⛔ You are not authorized to use this command.", threadID, messageID);
    }

    // Main UGC logic
    return api.sendMessage(
      `✅ UGC Command Activated\nYou now have access to custom-generated content or controls.`,
      threadID,
      messageID
    );
  }
};

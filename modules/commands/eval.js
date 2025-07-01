const { removeHomeDir, log } = global.utils;

module.exports = {
  config: {
    name: 'eval',
    version: '1.6',
    hasPermssion: 2, // match "role: 2" from old version
    credits: 'Hassan',
    description: 'Test code quickly (for bot owners only)',
    commandCategory: 'owner',
    usages: 'eval <code>',
    cooldowns: 5,
    usePrefix: true
  },

  langs: {
    vi: {
      error: '❌ Đã có lỗi xảy ra:'
    },
    en: {
      error: '❌ An error occurred:'
    }
  },

  run: async function ({ api, args, message, event, threadsData, usersData, dashBoardData, globalData, threadModel, userModel, dashBoardModel, globalModel, role, getLang }) {
    function output(msg) {
      if (typeof msg === 'number' || typeof msg === 'boolean' || typeof msg === 'function') {
        msg = msg.toString();
      } else if (msg instanceof Map) {
        let text = `Map(${msg.size}) `;
        text += JSON.stringify(mapToObj(msg), null, 2);
        msg = text;
      } else if (typeof msg === 'object') {
        msg = JSON.stringify(msg, null, 2);
      } else if (typeof msg === 'undefined') {
        msg = 'undefined';
      }
      message.reply(msg);
    }

    function out(msg) {
      output(msg);
    }

    function mapToObj(map) {
      const obj = {};
      map.forEach((v, k) => {
        obj[k] = v;
      });
      return obj;
    }

    const cmd = `
      (async () => {
        try {
          ${args.join(' ')}
        } catch (err) {
          log.err("eval command", err);
          message.send(
            "${getLang("error")}\\n" +
            (err.stack
              ? removeHomeDir(err.stack)
              : removeHomeDir(JSON.stringify(err, null, 2) || "")
            )
          );
        }
      })()`;

    eval(cmd);
  }
};

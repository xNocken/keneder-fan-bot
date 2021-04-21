const Discord = require('discord-module');
const Message = require('discord-module/classes/Message');
const codeFlex = require('./src/triggerwords/codeFlex');
const codeImprover = require('./src/triggerwords/codeImprover');

const discord = new Discord({
  token: require('./token'),
});

const triggerWords = [
  {
    func: codeImprover,
    regex: /```js\n+(.+\n*)*\n+```/gm,
  },
  {
    func: codeFlex,
    regex: /code/i,
  }
];

const commands = {
};

/**
 * @param {Message} message
 * @param {Function} reply
 */
discord.onmessage = (message, reply) => {
  const { content } = message;
  const args = content.split(/\s/gm);

  if (message.author.id === discord.getUser().id) {
    return;
  }

  if (args.shift() === '*keneder') {
    const command = args.shift();

    if (commands[command]) {
      commands[command](args, reply, message);
    } else {
      reply('Dieser Befehl existiert nicht');
    }
  } else {
    if (!content.length) {
      return;
    }

    triggerWords.forEach((triggerWord) => {
      const matched = content.match(triggerWord.regex);

      if (matched) {
        triggerWord.func(matched, reply, message);
      }
    });
  }
};

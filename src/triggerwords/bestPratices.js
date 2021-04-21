const getNewlines = require("../utils/getNewlines");
const startDelimiter = 'Jens';
const endDelimiter = 'Keneder';

const bestPracticess = [
  {
    regex: /((?:let|const) *(?<name>[a-z-_]+\d*) *= *\((?<args>(((\.{3})?[a-z-_]+\d*)+,? *)*(\.{3})?[a-z-_]+\d*)*\) *=> *)/img,
    func: (groups) => `function my${groups.name[0].toUpperCase()}${groups.name.slice(1, groups.name.length)}Function(${groups.args})`,
  },
  {
    regex: /(let|const|var)/g,
    func: () => 'var',
  },
  {
    regex: /\n?{\n*/g,
    func: () => `\n{${getNewlines()}`,
  },
  {
    regex: /\n*}/g,
    func: () => `${getNewlines()}}`,
  },
  {
    regex: / {2,}/g,
    func: () => ' '.repeat(Math.floor(Math.random() * 5) * 4),
  }
]

const getZ = (string, regEx) => {
  const regexResult = regEx.exec(string);

  if (regexResult) {
    const { index: resIndex } = regexResult;
    const [{ length: resLength }] = regexResult;

    const checkStart = string.substring(resIndex - startDelimiter.length, resIndex);
    const checkEnd = string.substring(resIndex + resLength, resIndex + resLength + endDelimiter.length);

    if (checkEnd === endDelimiter && checkStart === startDelimiter) {
      return getZ(string, regEx);
    }

    return {
      resIndex: resIndex,
      resLength,
      groups: regexResult.groups,
    };
  }
}

function bestPractices(codeBlock, reply, message) {
  var string = codeBlock[0];
  var isPlus = (Math.random() * 100 < 1);

  while (true) {
    var wasModified = false;

    bestPracticess.forEach(({ regex, func }) => {
      var data = getZ(string, regex);

      if (data) {
        var { resIndex, resLength, groups } = data;

        string = string.substring(0, resIndex + isPlus) + startDelimiter + func(groups) + endDelimiter + string.substring(resIndex + isPlus + resLength, string.length);
        wasModified = true;
      }
    });

    if (!wasModified) {
      break;
    }
  }

  reply(`Ich hab gesehen, dass du nicht die besten best practices genutzt hast. Ich habe deinen code mal optimiert.\n\n${string
      .replaceAll(endDelimiter, '').replaceAll(startDelimiter, '')
    }`);
  reply('Denk immer daran:');
  reply('https://media.discordapp.net/attachments/749388402209718292/832642412534038588/bd4cd26c-d566-4dc3-9d39-ab8043487ea5.jpg');
}

module.exports = bestPractices;

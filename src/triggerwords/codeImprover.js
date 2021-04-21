const bestPractices = require("../config/bestPractices");
const startDelimiter = 'Jens';
const endDelimiter = 'Keneder';

const getNextUnmodifiedMatch = (string, regEx) => {
  const regexResult = regEx.exec(string);

  if (regexResult) {
    const { index: resIndex } = regexResult;
    const [{ length: resLength }] = regexResult;

    const checkStart = string.substring(resIndex - startDelimiter.length, resIndex);
    const checkEnd = string.substring(resIndex + resLength, resIndex + resLength + endDelimiter.length);

    if (checkEnd === endDelimiter && checkStart === startDelimiter) {
      return getNextUnmodifiedMatch(string, regEx);
    }

    return {
      resIndex,
      resLength,
      groups: regexResult.groups,
    };
  }

  return false;
}

const codeImprover = (codeBlock, reply) => {
  let string = codeBlock[0];
  const isPlus = (Math.random() * 100 < 1);
  let codeWasModified = false;

  while (true) {
    let wasModified = false;

    bestPractices.forEach(({ regex, func, canMod }) => {
      const data = getNextUnmodifiedMatch(string, regex);

      if (data) {
        const { resIndex, resLength, groups } = data;
        const stringBeforeMod = string.substring(0, resIndex + isPlus);
        const stringAfterMod =  string.substring(resIndex + isPlus + resLength, string.length);
        const mod = func(groups);

        string = stringBeforeMod + startDelimiter + mod + endDelimiter + stringAfterMod;
        wasModified = true;

        if (canMod) {
          codeWasModified = true;
        }
      }
    });

    if (!wasModified) {
      break;
    }
  }

  if (codeWasModified) {
    reply(`Ich hab gesehen, dass du nicht die besten best practices genutzt hast. Ich habe deinen code mal optimiert.\n\n${string
      .replaceAll(endDelimiter, '').replaceAll(startDelimiter, '')
    }`);
    reply('Denk immer daran:');
    reply('https://media.discordapp.net/attachments/749388402209718292/832642412534038588/bd4cd26c-d566-4dc3-9d39-ab8043487ea5.jpg');
  } else {
    reply('Es freut mich zu sehen dass du meine besten best practices nutzt.');
  }
}

module.exports = codeImprover;

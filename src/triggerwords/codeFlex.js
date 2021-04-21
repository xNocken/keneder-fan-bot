const scriptList = require("../config/scriptList");

const textGood = 'Wenn ihr schon über Code redet, solltet ihr euch den angucken. Da sind mehr der besten best Practices drin, als ihr wisst, dass es gibt';
const textBad = 'Oh ihr redet über code? Nehmt euch keinen Beispiel an diesem Code. Mein Pr mit meinen besten best practices muss noch von github verarbeitet werden';

const codeFlex = (_, reply) => {
  const code = scriptList[Math.floor(Math.random() * scriptList.length)];

  reply(`${code.isGood ? textGood : textBad}:\n<${code.url}>`);
};

module.exports = codeFlex;

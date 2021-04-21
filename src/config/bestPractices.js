const getNewlines = require("../utils/getNewlines");

const bestPractices = [
  {
    regex: /((?:let|const) *(?<name>[a-z-_]+\d*) *= *\((?<args>(((\.{3})?[a-z-_]+\d*)+,? *)*(\.{3})?[a-z-_]+\d*)*\) *=> *)/img,
    func: (groups) => `function my${groups.name[0].toUpperCase()}${groups.name.slice(1, groups.name.length)}Function(${groups.args})`,
    canMod: true,
  },
  {
    regex: /(let|const)/g,
    func: () => 'var',
    canMod: true,
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
  },
  {
    regex: /'/,
    func: () => '"',
  },
  {
    regex: /;/,
    func: () => '',
  }
]

module.exports = bestPractices;

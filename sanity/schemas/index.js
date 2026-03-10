const brandVoice = require('./brandVoice.js')
const writingRule = require('./writingRule.js')
const toneContext = require('./toneContext.js')
const grammar = require('./grammar.js')
const contentType = require('./contentType.js')

module.exports = {
  schemaTypes: [brandVoice, writingRule, toneContext, grammar, contentType],
}

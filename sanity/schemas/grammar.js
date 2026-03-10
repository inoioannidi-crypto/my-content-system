function stringArrayField(name, title, description) {
  return { name, title, description, type: 'array', of: [{ type: 'string' }] }
}

module.exports = {
  name: 'grammar',
  title: 'Grammar & Style',
  type: 'document',
  fields: [
    stringArrayField('language', 'Language', 'Regional spellings, product terminology, and consistent naming'),
    stringArrayField('capitalization', 'Capitalization', 'When to capitalize and when not to'),
    stringArrayField('numbersAndSymbols', 'Numbers & symbols', 'Formatting numbers, currencies, and percentages'),
    stringArrayField('punctuation', 'Punctuation', 'Rules for full stops, dashes, ampersands, and more'),
    stringArrayField('datesAndTimes', 'Dates & times', 'Standard formats for dates and times across the product'),
    stringArrayField('wordChoices', 'Word choices', 'Preferred terms and words to avoid'),
    stringArrayField('bulletPoints', 'Bullet points', 'How to structure lists consistently'),
  ],
  preview: { prepare: () => ({ title: 'Grammar & Style' }) },
}

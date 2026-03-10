module.exports = {
  name: 'toneContext',
  title: 'Tone by Context',
  type: 'document',
  orderings: [{
    title: 'Display order',
    name: 'orderAsc',
    by: [{ field: 'order', direction: 'asc' }],
  }],
  fields: [
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
    },
    {
      name: 'context',
      title: 'Context',
      description: 'e.g. "Error Messages", "Onboarding / Empty States"',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'tone',
      title: 'Tone',
      description: 'e.g. "Clear, constructive, action-oriented — never blaming"',
      type: 'string',
      validation: (R) => R.required(),
    },
  ],
  preview: {
    select: { title: 'context', subtitle: 'tone' },
  },
}

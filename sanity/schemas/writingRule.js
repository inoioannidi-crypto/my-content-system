export default {
  name: 'writingRule',
  title: 'Writing Rule',
  type: 'document',
  orderings: [{
    title: 'Rule number',
    name: 'numberAsc',
    by: [{ field: 'number', direction: 'asc' }],
  }],
  fields: [
    {
      name: 'number',
      title: 'Rule number',
      type: 'number',
      validation: (R) => R.required().min(1).max(20),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'points',
      title: 'Points',
      description: 'Each item is a bullet point explaining the rule',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'test',
      title: 'Test question',
      description: 'A yes/no question to test if the copy follows this rule',
      type: 'string',
    },
    {
      name: 'exampleImage',
      title: 'Example image',
      description: 'A visual example of this rule applied in the product',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'number' },
    prepare: ({ title, subtitle }) => ({ title: `${subtitle}. ${title}` }),
  },
}

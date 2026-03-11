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
      name: 'body',
      title: 'Body',
      description: "Rule explanation with bullet points and do/don't examples",
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
          },
        },
        { type: 'doAndDont' },
      ],
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

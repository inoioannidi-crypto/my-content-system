export default {
  name: 'brandVoice',
  title: 'Brand Voice',
  type: 'document',
  fields: [
    {
      name: 'core',
      title: 'Core voice traits',
      description: 'The 3 paired traits that define the Workable voice',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'trait', title: 'Trait (e.g. "Empathetic yet Professional")', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' },
        ],
        preview: { select: { title: 'trait', subtitle: 'description' } },
      }],
    },
    {
      name: 'values',
      title: 'Writing values',
      description: 'The 3 testable writing values (Simple, Direct, Efficient)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', title: 'Value name', type: 'string' },
          { name: 'description', title: 'Description', type: 'text', rows: 2 },
        ],
        preview: { select: { title: 'name', subtitle: 'description' } },
      }],
    },
    {
      name: 'body',
      title: 'Body',
      description: 'Rich narrative guidance on applying the brand voice',
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
      name: 'coverImage',
      title: 'Cover image',
      description: 'A visual that represents the brand voice (e.g. tone reference chart)',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: { prepare: () => ({ title: 'Brand Voice' }) },
}

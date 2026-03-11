export default {
  name: 'grammar',
  title: 'Grammar & Style',
  type: 'document',
  fields: [
    {
      name: 'body',
      title: 'Body',
      description: 'All grammar, style, capitalization, punctuation, and word choice rules',
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
  ],
  preview: { prepare: () => ({ title: 'Grammar & Style' }) },
}

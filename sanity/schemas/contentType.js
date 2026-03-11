export default {
  name: 'contentType',
  title: 'Content Type',
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
      name: 'type',
      title: 'Type name',
      description: 'e.g. "Button / CTA", "Error message"',
      type: 'string',
      validation: (R) => R.required(),
    },
    {
      name: 'body',
      title: 'Body',
      description: "Rich text rules and do/don't examples for this content type",
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
      name: 'exampleImage',
      title: 'Example image',
      description: 'An annotated screenshot or diagram illustrating this content type',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    select: { title: 'type' },
  },
}

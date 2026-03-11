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
      name: 'rules',
      title: 'Rules',
      description: 'Quick-reference rules specific to this content type',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
  preview: {
    select: { title: 'type' },
  },
}

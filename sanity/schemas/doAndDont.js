export default {
  name: 'doAndDont',
  title: 'Do & Don\'t example',
  type: 'object',
  fields: [
    { name: 'doExample', title: 'Do', type: 'string' },
    { name: 'dontExample', title: "Don't", type: 'string' },
  ],
  preview: {
    select: { title: 'doExample', subtitle: 'dontExample' },
    prepare: ({ title, subtitle }) => ({
      title: `✓ ${title || ''}`,
      subtitle: `✗ ${subtitle || ''}`,
    }),
  },
}

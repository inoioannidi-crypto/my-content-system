module.exports = {
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
  ],
  preview: { prepare: () => ({ title: 'Brand Voice' }) },
}

const { defineConfig } = require('sanity')
const { structureTool } = require('sanity/structure')
const { visionTool } = require('@sanity/vision')
const { schemaTypes } = require('./schemas/index.js')

module.exports = defineConfig({
  name: 'default',
  title: 'Workable Content System',
  projectId: 'cvggucp0',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content Guidelines')
          .items([
            S.listItem()
              .title('Brand Voice')
              .child(S.document().schemaType('brandVoice').documentId('brand-voice')),
            S.listItem()
              .title('Grammar & Style')
              .child(S.document().schemaType('grammar').documentId('grammar')),
            S.divider(),
            S.documentTypeListItem('writingRule').title('Writing Rules'),
            S.documentTypeListItem('toneContext').title('Tone by Context'),
            S.documentTypeListItem('contentType').title('Content Types'),
          ]),
    }),
    visionTool(),
  ],

  schema: { types: schemaTypes },
})

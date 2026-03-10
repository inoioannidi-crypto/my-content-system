import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index.js'

export default defineConfig({
  name: 'default',
  title: 'Workable Content System',

  // Fill in your Sanity project ID after creating a project at sanity.io
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'REPLACE_WITH_YOUR_PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

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

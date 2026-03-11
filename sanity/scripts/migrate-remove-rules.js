/**
 * Removes the legacy `rules` field from all contentType documents.
 *
 * The schema was updated to use a Portable Text `body` field instead of the
 * old `rules` string array. This script cleans up any documents that still
 * carry the old field so Sanity Studio stops showing "Unknown field found".
 *
 * Usage:
 *   SANITY_TOKEN=<your-write-token> node scripts/migrate-remove-rules.js
 *
 * Get a token: sanity.io/manage → project → API → Tokens → Add API token (Editor role)
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'cvggucp0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function main() {
  if (!process.env.SANITY_TOKEN) {
    console.error(
      'Error: SANITY_TOKEN environment variable is required.\n' +
      'Get one at: sanity.io/manage → your project → API → Tokens → Add API token (Editor role)\n' +
      'Then run: SANITY_TOKEN=<token> node scripts/migrate-remove-rules.js'
    )
    process.exit(1)
  }

  const docs = await client.fetch(
    '*[_type == "contentType" && defined(rules)]{ _id, type }'
  )

  if (docs.length === 0) {
    console.log('No contentType documents with a legacy rules field found. Nothing to do.')
    return
  }

  console.log(`Found ${docs.length} document(s) with a legacy rules field. Removing...\n`)

  for (const doc of docs) {
    await client.patch(doc._id).unset(['rules']).commit()
    console.log(`  ✓ ${doc._id}  (${doc.type || 'untitled'})`)
  }

  console.log('\nDone. rules field removed from all contentType documents.')
}

main().catch((err) => {
  console.error('\nMigration failed:', err.message)
  process.exit(1)
})

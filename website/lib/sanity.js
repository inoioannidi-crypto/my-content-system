import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'cvggucp0',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

export async function getBrandVoice() {
  return client.fetch(`*[_type == "brandVoice"][0]{ core, values, body }`)
}

export async function getWritingRules() {
  return client.fetch(
    `*[_type == "writingRule"] | order(number asc) { number, title, body, test }`
  )
}

export async function getToneContexts() {
  return client.fetch(
    `*[_type == "toneContext"] | order(order asc) { context, tone }`
  )
}

export async function getGrammar() {
  return client.fetch(`*[_type == "grammar"][0]{ body }`)
}

export async function getContentTypes() {
  return client.fetch(
    `*[_type == "contentType"] | order(order asc) { type, body }`
  )
}

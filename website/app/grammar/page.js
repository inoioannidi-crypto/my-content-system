import { getGrammar } from '../../lib/sanity'
import PortableTextBody from '../../components/PortableTextBody'

export const revalidate = 3600

export const metadata = { title: 'Grammar & Style — Workable Content Design System' }

export default async function GrammarPage() {
  const grammar = await getGrammar()

  if (!grammar?.body?.length) {
    return (
      <div className="empty-state">
        No grammar content found. Run the import script to populate Sanity.
      </div>
    )
  }

  return (
    <>
      <div className="page-eyebrow">Grammar & Style</div>
      <h1 className="page-title">Grammar & Style</h1>
      <p className="page-desc">
        Consistent language, capitalization, punctuation, and word choices across every surface.
      </p>

      <PortableTextBody value={grammar.body} className="pt-body" />
    </>
  )
}

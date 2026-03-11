import { getContentTypes } from '../../lib/sanity'
import PortableTextBody from '../../components/PortableTextBody'

export const revalidate = 3600

export const metadata = { title: 'Content Types — Workable Content Design System' }

export default async function ContentTypesPage() {
  const types = await getContentTypes()

  if (!types?.length) {
    return (
      <div className="empty-state">
        No content types found. Run the import script to populate Sanity.
      </div>
    )
  }

  return (
    <>
      <div className="page-eyebrow">Content types</div>
      <h1 className="page-title">Content types</h1>
      <p className="page-desc">
        Quick-reference rules and do/don&apos;t examples for every type of UI copy — from buttons to error messages.
      </p>

      <div className="ct-grid">
        {types.map((ct, i) => (
          <div key={ct.type} className="ct-card">
            <div className="ct-card-header">
              <span className="ct-order">{String(i + 1).padStart(2, '0')}</span>
              <span className="ct-name">{ct.type}</span>
            </div>
            {ct.body?.length > 0 && (
              <div className="ct-body">
                <PortableTextBody value={ct.body} className="pt-body" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

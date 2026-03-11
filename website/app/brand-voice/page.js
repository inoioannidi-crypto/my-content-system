import { getBrandVoice } from '../../lib/sanity'
import PortableTextBody from '../../components/PortableTextBody'

export const revalidate = 3600

export const metadata = { title: 'Brand Voice — Workable Content Design System' }

export default async function BrandVoicePage() {
  const data = await getBrandVoice()

  if (!data) {
    return (
      <div className="empty-state">
        No brand voice content found. Run the import script to populate Sanity.
      </div>
    )
  }

  return (
    <>
      <div className="page-eyebrow">Voice</div>
      <h1 className="page-title">Brand voice</h1>
      <p className="page-desc">
        The core traits and writing values that shape every piece of Workable content.
      </p>

      {data.core?.length > 0 && (
        <div className="subsection">
          <div className="subsection-title">Core voice</div>
          <div className="trait-grid">
            {data.core.map((trait) => {
              const parts = trait.trait?.split(', yet ') ?? [trait.trait]
              return (
                <div key={trait._key} className="trait-card">
                  <div className="trait-name">{parts[0]}</div>
                  {parts[1] && (
                    <>
                      <div className="trait-vs">yet</div>
                      <div className="trait-name">{parts[1]}</div>
                    </>
                  )}
                  <div className="trait-desc">{trait.description}</div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {data.values?.length > 0 && (
        <div className="subsection">
          <div className="subsection-title">Writing values</div>
          <div className="value-list">
            {data.values.map((v) => (
              <div key={v._key} className="value-item">
                <span className="value-badge">{v.name}</span>
                <div>
                  <div className="value-name">{v.name}</div>
                  <div className="value-desc">{v.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.body?.length > 0 && (
        <>
          <div className="divider" />
          <PortableTextBody value={data.body} className="pt-body" />
        </>
      )}
    </>
  )
}

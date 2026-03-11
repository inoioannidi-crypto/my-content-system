import { getToneContexts } from '../../lib/sanity'

export const revalidate = 3600

export const metadata = { title: 'Tone by Context — Workable Content Design System' }

const contextColors = {
  'Product UI & Microcopy': '#0d99ff',
  'Marketing Copy': '#9b59b6',
  'Help Center & Support': '#1a9e5c',
  'Error Messages': '#d93025',
  'Emails & Notifications': '#e67e22',
  'Onboarding / Empty States': '#2ecc71',
  'Flash Messages': '#7f8c8d',
}

export default async function ToneByContextPage() {
  const contexts = await getToneContexts()

  if (!contexts?.length) {
    return (
      <div className="empty-state">
        No tone contexts found. Run the import script to populate Sanity.
      </div>
    )
  }

  return (
    <>
      <div className="page-eyebrow">Tone</div>
      <h1 className="page-title">Tone by context</h1>
      <p className="page-desc">
        Match your writing style to where and how it will be read. The voice stays consistent — the tone shifts with the moment.
      </p>

      <table className="tone-table">
        <thead>
          <tr>
            <th>Context</th>
            <th>Tone</th>
          </tr>
        </thead>
        <tbody>
          {contexts.map((row) => (
            <tr key={row.context}>
              <td className="tone-ctx">
                <span
                  className="tone-dot"
                  style={{ background: contextColors[row.context] ?? '#aaa' }}
                />
                {row.context}
              </td>
              <td className="tone-val">{row.tone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

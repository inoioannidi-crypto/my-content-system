import { getWritingRules } from '../../lib/sanity'
import PortableTextBody from '../../components/PortableTextBody'

export const revalidate = 3600

export const metadata = { title: '7 Writing Rules — Workable Content Design System' }

export default async function WritingRulesPage() {
  const rules = await getWritingRules()

  if (!rules?.length) {
    return (
      <div className="empty-state">
        No writing rules found. Run the import script to populate Sanity.
      </div>
    )
  }

  return (
    <>
      <div className="page-eyebrow">Rules</div>
      <h1 className="page-title">7 writing rules</h1>
      <p className="page-desc">
        Apply these to every piece of copy you write or review. Each rule includes a test question so you can check your work quickly.
      </p>

      <div className="ct-grid">
        {rules.map((rule) => (
          <div key={rule.number} className="rule-card">
            <div className="rule-header">
              <span className="rule-num">{rule.number}</span>
              <span className="rule-title">{rule.title}</span>
            </div>
            <div className="rule-body">
              {rule.body?.length > 0 && (
                <PortableTextBody value={rule.body} className="pt-body" />
              )}
              {rule.test && (
                <div className="rule-test">
                  <span className="rule-test-label">Test:</span>
                  <span>{rule.test}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

import { PortableText } from '@portabletext/react'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim()
}

function DoAndDontBlock({ value }) {
  return (
    <div className="do-dont">
      <div className="dont-card">
        <div className="dont-label">✕ Don&apos;t</div>
        <div className="dont-text">{value.dontExample}</div>
      </div>
      <div className="do-card">
        <div className="do-label">✓ Do</div>
        <div className="do-text">{value.doExample}</div>
      </div>
    </div>
  )
}

const portableTextComponents = {
  types: {
    doAndDont: ({ value }) => <DoAndDontBlock value={value} />,
  },
  block: {
    h2: ({ children, value }) => {
      const text = value.children?.map((c) => c.text || '').join('') ?? ''
      return (
        <h2 id={slugify(text)} className="body-h2">
          {children}
        </h2>
      )
    },
    h3: ({ children }) => <h3 className="body-h3">{children}</h3>,
    normal: ({ children }) => {
      // suppress empty paragraphs that @portabletext/react emits between list items
      const hasContent = Array.isArray(children)
        ? children.some((c) => c !== null && c !== undefined && c !== '')
        : !!children
      if (!hasContent) return null
      return <p className="body-p">{children}</p>
    },
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="body-ul">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => <li className="body-li">{children}</li>,
  },
}

export default function PortableTextBody({ value, className }) {
  if (!value?.length) return null
  return (
    <div className={className}>
      <PortableText value={value} components={portableTextComponents} />
    </div>
  )
}

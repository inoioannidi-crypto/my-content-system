'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navGroups = [
  {
    label: 'Voice',
    items: [{ href: '/brand-voice', label: 'Brand voice' }],
  },
  {
    label: 'Rules',
    items: [{ href: '/writing-rules', label: '7 writing rules' }],
  },
  {
    label: 'Tone',
    items: [{ href: '/tone-by-context', label: 'Tone by context' }],
  },
  {
    label: 'Grammar & Style',
    items: [
      { href: '/grammar', label: 'Language' },
      { href: '/grammar#capitalization', label: 'Capitalization' },
      { href: '/grammar#numbers-and-symbols', label: 'Numbers & symbols' },
      { href: '/grammar#punctuation', label: 'Punctuation' },
      { href: '/grammar#dates-and-times', label: 'Dates & times' },
      { href: '/grammar#word-choices', label: 'Word choices' },
      { href: '/grammar#bullet-points', label: 'Bullet points' },
    ],
  },
  {
    label: 'Content types',
    items: [{ href: '/content-types', label: 'All content types' }],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  function isActive(href) {
    const hrefPath = href.split('#')[0]
    return pathname === hrefPath
  }

  return (
    <nav className="sidebar" aria-label="Content guidelines navigation">
      {navGroups.map((group) => (
        <div className="nav-group" key={group.label}>
          <span className="nav-label">{group.label}</span>
          {group.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${isActive(item.href) ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  )
}

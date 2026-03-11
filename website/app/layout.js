import './globals.css'
import Link from 'next/link'
import Sidebar from '../components/Sidebar'

export const metadata = {
  title: 'Workable Content Design System',
  description: 'Brand voice, writing rules, grammar, and content type guidelines.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header className="topbar">
          <Link href="/brand-voice" className="brand">
            Workable <span>Content</span>
          </Link>
          <div className="topbar-sep" />
          <div className="topbar-right">
            <span className="version-tag">v1.0</span>
            <a
              href="https://cvggucp0.sanity.studio"
              target="_blank"
              rel="noreferrer"
              className="studio-link"
            >
              Open Studio ↗
            </a>
          </div>
        </header>

        <div className="layout">
          <Sidebar />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  )
}

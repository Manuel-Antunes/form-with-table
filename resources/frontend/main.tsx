import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './App'
import './styles/app.css'

// getAnalytics(app)
const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Adonis'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    const page: any = pages[`./pages/${name}.tsx`]
    page.default.layout =
      page.default.layout || ((page: React.ReactNode) => <AppProviders children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render((<App {...props} />) as React.ReactElement)
  },
})

InertiaProgress.init()

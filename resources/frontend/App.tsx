import React from 'react'
import { NotifierContextProvider } from 'react-headless-notifier'
import StardustProvider from './contexts/Stardust'
import { ToastContainer } from './services/toast'

export interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <StardustProvider>
      <NotifierContextProvider
        config={{
          max: null,
          duration: 5000,
          position: 'bottomRight',
        }}
      >
        {children}
        <ToastContainer />
      </NotifierContextProvider>
    </StardustProvider>
  )
}

export default AppProviders

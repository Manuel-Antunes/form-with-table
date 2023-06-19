import React from 'react'
import { If, Then } from 'react-if'
import appLogo from 'resources/frontend/assets/images/app-logo.svg'

export interface AppLogoProps {
  hideName?: boolean
}

const AppLogo: React.FC<AppLogoProps> = ({ hideName }) => {
  return (
    <>
      <img className="mx-auto h-12 w-12" src={appLogo} alt="logo" />
      <If condition={!hideName}>
        <Then>
          <p className="dark:text-navy-100 text-xl font-semibold uppercase text-slate-700">
            Payless
          </p>
        </Then>
      </If>
    </>
  )
}

export default AppLogo

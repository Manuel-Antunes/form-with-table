import { usePage } from '@inertiajs/react'
import React, { PropsWithChildren } from 'react'
import { PageGlobalProps } from '../../@types/page'

export const Admin: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    props: {
      auth: { user },
    },
  } = usePage<PageGlobalProps>()
  return user.admin ? <>{children}</> : <></>
}

export const DefaultUser: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    props: {
      auth: { user },
    },
  } = usePage<PageGlobalProps>()
  return !user.admin ? <>{children}</> : <></>
}

export const Authenticated: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    props: {
      auth: { authenticated },
    },
  } = usePage<PageGlobalProps>()
  return authenticated ? <>{children}</> : <></>
}

export const Guest: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    props: {
      auth: { authenticated },
    },
  } = usePage<PageGlobalProps>()
  return !authenticated ? <>{children}</> : <></>
}

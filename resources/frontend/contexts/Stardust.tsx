import type { Stardust } from '@eidellev/adonis-stardust/client/Stardust'
import React, { PropsWithChildren, createContext, useEffect } from 'react'

const StardustContext = createContext<Stardust>({} as Stardust)

const StardustProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [stardust, setStardust] = React.useState<Stardust>(
    new Proxy(
      {},
      {
        get() {
          return () => {
            console.warn('Stardust is not initialized yet')
          }
        },
      }
    ) as Stardust
  )

  useEffect(() => {
    import('@eidellev/adonis-stardust/client').then(({ stardust }) => {
      setStardust(stardust)
    })
  }, [])
  return <StardustContext.Provider value={stardust}>{children}</StardustContext.Provider>
}

export const useStardust = () => React.useContext(StardustContext)

export default StardustProvider

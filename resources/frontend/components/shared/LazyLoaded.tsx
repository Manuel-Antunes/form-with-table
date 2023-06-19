import React, { useEffect, useMemo, useState } from 'react'

export interface LazyLoadedProps {
  children: React.ReactNode
  time: number
}
const SuspenseTrigger = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  throw new Promise(() => {})
}

const LazyLoaded: React.FC<LazyLoadedProps> = ({ children, time }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setReady(true)
    }, time)
  }, [])

  const Processed = useMemo(() => {
    if (ready) {
      return children
    }
    return <SuspenseTrigger />
  }, [ready])

  return <>{Processed}</>
}

export default LazyLoaded

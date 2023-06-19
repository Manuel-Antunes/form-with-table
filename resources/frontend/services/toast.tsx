/* eslint-disable no-unused-vars */
import React from 'react'
import { useNotifier } from 'react-headless-notifier'

import { DangerToast, InfoToast, SuccessToast, WarningToast } from '../components/shared/Toast'

interface Toast {
  notifier: {
    notify: (children: React.ReactNode, overrideConfig?: any | undefined) => void
    dismissAll: () => void
  } | null
  component: () => React.FC
  notify: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    overrideConfig?: Record<string, never> | undefined
  ) => void
  success: (message: string, overrideConfig?: Record<string, never> | undefined) => void
  error: (message: string, overrideConfig?: Record<string, never> | undefined) => void
  info: (message: string, overrideConfig?: Record<string, never> | undefined) => void
  warning: (message: string, overrideConfig?: Record<string, never> | undefined) => void
}

const rtoast: Toast = {
  notifier: null,
  component() {
    const EmptyComponent = () => {
      this.notifier = useNotifier()
      return <></>
    }
    return EmptyComponent
  },

  notify(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    overrideConfig?: Record<string, never> | undefined
  ) {
    let children: React.ReactNode
    if (type === 'success') {
      children = <SuccessToast message={message} />
    }
    if (type === 'error') {
      children = <DangerToast message={message} />
    }
    if (type === 'info') {
      children = <InfoToast message={message} />
    }
    if (type === 'warning') {
      children = <WarningToast message={message} />
    }
    this.notifier?.notify(children, overrideConfig)
  },
  success(message: string, overrideConfig?: Record<string, never> | undefined) {
    this.notify(message, 'success', overrideConfig)
  },
  error(message: string, overrideConfig?: Record<string, never> | undefined) {
    this.notify(message, 'error', overrideConfig)
  },
  info(message: string, overrideConfig?: Record<string, never> | undefined) {
    this.notify(message, 'info', overrideConfig)
  },
  warning(message: string, overrideConfig?: Record<string, never> | undefined) {
    this.notify(message, 'warning', overrideConfig)
  },
}

export const ToastContainer = rtoast.component()

export const toast = rtoast

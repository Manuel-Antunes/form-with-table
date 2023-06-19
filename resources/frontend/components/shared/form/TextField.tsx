import { clsx } from 'clsx'
import { forwardRef, InputHTMLAttributes, useContext } from 'react'
import { FormControlContext } from './FormControl'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: React.ReactNode
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ error, helperText, className, ...rest }, ref) => {
    const ctx = useContext(FormControlContext)

    if (ctx) {
      error = ctx.error
      helperText = ctx.helperText
    }
    return (
      <input
        {...rest}
        ref={ref}
        className={clsx(
          'form-input w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2',
          className,
          {
            'border border-success': !!helperText,
            'border border-error': !!error,
            'placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent':
              !helperText,
          }
        )}
      />
    )
  }
)

export default TextField

import clsx from 'clsx'
import { createContext, HTMLProps } from 'react'

export interface FormControlProps extends HTMLProps<HTMLLabelElement> {
  error?: boolean
  helperText?: React.ReactNode
  label?: string
}

export const FormControlContext = createContext<FormControlProps>({})

const FormControl: React.FC<FormControlProps> = ({
  error,
  helperText,
  label,
  className,
  children,
  ...rest
}) => {
  return (
    <FormControlContext.Provider value={{ error, helperText, label }}>
      <div className="w-full">
        {label && <span>{label}</span>}
        <label
          className={clsx('block', className, {
            'mt-1.5': label,
          })}
          {...rest}
        >
          {children}
        </label>
        {helperText && (
          <span
            className={clsx('text-tiny+ text-success', {
              'text-tiny+ text-error': error,
            })}
          >
            {helperText}
          </span>
        )}
      </div>
    </FormControlContext.Provider>
  )
}

export default FormControl

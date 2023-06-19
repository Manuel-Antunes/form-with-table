import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import React, { ChangeEventHandler, HTMLProps, useCallback, useMemo } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { MySwal } from '../../../services/swal'

export type AvatarInputProps = Omit<
  Omit<HTMLProps<HTMLInputElement>, 'value'> & {
    onChange?: ChangeEventHandler<HTMLInputElement>
    value?: File | AttachmentContract | null | string
    altText?: string
    className?: string
  },
  'onDrop'
>

const AvatarInput: React.FC<AvatarInputProps> = ({ onChange, value, className, ...rest }) => {
  const onDrop = useCallback(
    (acceptedFiles: any[], fileRejections: FileRejection[]) => {
      if (fileRejections.length === 0) {
        const evt = {
          target: {
            files: acceptedFiles as unknown as FileList | null,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>
        if (onChange) {
          console.log(evt)
          onChange(evt)
        }
      }
    },
    [onChange]
  )

  const onDropRejected = useCallback(() => {
    MySwal.fire('Arquivo não suportado!', 'Envie arquivos do tipo .png', 'error')
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop,
    onDropRejected,
  })

  const path = useMemo(() => {
    try {
      console.log(value)
      const url =
        value && (value as AttachmentContract).url
          ? (value as AttachmentContract).url
          : typeof value === 'string'
          ? value
          : URL.createObjectURL(value as unknown as Blob)

      return url
    } catch (error) {
      console.log(`Formato não suportado! ${error}`)
      return ''
    }
  }, [value])

  return (
    <div {...getRootProps()} className="avatar cursor-pointer mt-1.5 h-20 w-20">
      <img className="mask is-squircle" src={path} alt="avatar" />
      <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white dark:bg-navy-700">
        <input
          {...getInputProps()}
          className="btn h-6 w-6 rounded-full border border-slate-200 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:border-navy-500 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
          rel="noreferrer"
        ></input>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </div>
    </div>
  )
}

export default AvatarInput

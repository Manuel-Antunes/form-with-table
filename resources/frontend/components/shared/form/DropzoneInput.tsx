import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import clsx from 'clsx'
import { ChangeEventHandler, HTMLProps, forwardRef, useCallback, useMemo } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import { MySwal } from '../../../services/swal'

export type DropzoneInputProps = Omit<
  Omit<HTMLProps<HTMLInputElement>, 'value'> & {
    onChange?: ChangeEventHandler<HTMLInputElement>
    value?: File | AttachmentContract | null
    altText?: string
    className?: string
  },
  'onDrop'
>

const DropzoneInput = forwardRef<HTMLInputElement, DropzoneInputProps>(
  ({ onChange, value, className, ...rest }) => {
    //* handlers
    const onDrop = useCallback(
      (acceptedFiles: any[], fileRejections: FileRejection[]) => {
        if (fileRejections.length === 0) {
          const evt = {
            target: {
              files: acceptedFiles as unknown as FileList | null,
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>
          if (onChange) {
            onChange(evt)
          }
        }
      },
      [onChange]
    )

    const onDropRejected = useCallback(() => {
      MySwal.fire('Arquivo não suportado!', 'Envie arquivos do tipo .png', 'error')
    }, [])

    //* hooks
    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
      maxFiles: 1,
      onDropRejected,
      onDrop,
      ...(rest as any),
    })

    //* memos
    const path = useMemo(() => {
      try {
        const url =
          value && (value as AttachmentContract).url
            ? (value as AttachmentContract).url
            : URL.createObjectURL(value as unknown as Blob)

        return url
      } catch (error) {
        console.log(`Formato não suportado! ${error}`)
        return ''
      }
    }, [value])

    const message = useMemo(() => {
      if (isDragAccept) {
        return <p className="w-fit h-fit text-lime-400 font-semibold">Solte a imagem...</p>
      }
      if (isDragReject) {
        return (
          <p className="w-fit h-fit text-red-600 font-semibold">Este formato não é suportado.</p>
        )
      }
      if (!path) {
        return <p className="w-fit h-fit font-semibold">Arraste e solte sua imagem aqui...</p>
      }
      return ''
    }, [isDragAccept, isDragReject, path])

    //* render
    return (
      <div className="filepond fp-grid fp-bordered [--fp-grid:2]">
        <div className="filepond--panel-root p-5">
          <div {...getRootProps()} className={clsx('relative flex flex-col', className)}>
            <input {...getInputProps({ onChange })} />
            <div className="relative group flex w-full h-full min-h-[2rem]">
              {value && (
                <img
                  className="w-full h-full object-cover bg-gray-200 dark:bg-gray-500 text-center min-h-[2rem] rounded-md brightness-75 group-hover:brightness-50 transition duration-75 border-none"
                  src={path}
                  alt={path && rest.name ? `Seu${rest.name}` : ''}
                />
              )}
              {message && (
                <div
                  className={clsx(
                    {
                      'bg-black/50': path,
                    },
                    'absolute inset-0 flex items-center justify-center rounded-md group-hover:outline-dashed cursor-pointer transition-all group-hover:z-30'
                  )}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)

export default DropzoneInput

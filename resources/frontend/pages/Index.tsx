import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  mspConsoleName: z.string().nonempty(),
  mmc: z.string().nonempty(),
  userLogin: z.string().nonempty(),
  contractStartDate: z.string().transform((value) => {
    return new Date(value)
  }),
  acronisRampUp: z.string().nonempty(),
  stockRampUp: z.string().nonempty(),
  acronisGratuity: z.string().nonempty(),
  tradeName: z.string().nonempty(),
  cnpj: z.string().nonempty(),
  address: z.string().nonempty(),
  partnerFinancialContact: z.string().nonempty(),
  website: z.string().nonempty(),
  signingDate: z.string().transform((value) => {
    return new Date(value)
  }),
  paymentDay: z.string().nonempty(),
  stockGratuity: z.string().nonempty(),
  partnerContacts: z.string().nonempty(),
  stockChannelManager: z.string().nonempty(),
  dollarType: z.string().nonempty(),
  tax: z.string().nonempty(),
})

const optionsPaymentDay = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  // Adicione mais opções conforme necessário
]

type FormValues = z.infer<typeof schema>

const Index: React.FC<{ errors: any }> = ({ errors: serverSideErrors }) => {
  const {
    handleSubmit,
    register,
    formState: { errors: clientSideErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const errors = { ...serverSideErrors, ...clientSideErrors }

  const onSubmit = (data: FormValues) => {
    router.post('/', data as any)
  }

  return (
    <div className="container min-h-screen mx-auto flex">
      <form className="mx-auto my-auto w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2">
          <TextField
            label="Nome do MSP na Console"
            {...register('mspConsoleName')}
            error={!!errors.mspConsoleName}
            helperText={errors.mspConsoleName ? errors.mspConsoleName?.message?.toString() : ''}
          />
          <FormControl>
            <InputLabel id="mmc-label">MMC</InputLabel>
            <Select labelId="mmc-label" {...register('mmc')} error={!!errors.mmc}>
              {/* Opções mockadas */}
              <MenuItem value="opcao1">Opção 1</MenuItem>
              <MenuItem value="opcao2">Opção 2</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Login usuário"
            {...register('userLogin')}
            error={!!errors.userLogin}
            helperText={errors.userLogin ? errors.userLogin?.message?.toString() : ''}
          />
          <TextField
            label="Data de início de validade do contrato"
            type="date"
            {...register('contractStartDate')}
            error={!!errors.contractStartDate}
            helperText={
              errors.contractStartDate ? errors.contractStartDate?.message?.toString() : ''
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Ramp-up Acronis"
            {...register('acronisRampUp')}
            error={!!errors.acronisRampUp}
            helperText={errors.acronisRampUp ? errors.acronisRampUp?.message?.toString() : ''}
          />
          <TextField
            label="Ramp-up Stock"
            {...register('stockRampUp')}
            error={!!errors.stockRampUp}
            helperText={errors.stockRampUp ? errors.stockRampUp?.message?.toString() : ''}
          />
          <TextField
            label="Gratuidade Acronis"
            {...register('acronisGratuity')}
            error={!!errors.acronisGratuity}
            helperText={errors.acronisGratuity ? errors.acronisGratuity?.message?.toString() : ''}
          />
          <TextField
            label="Nome fantasia"
            {...register('tradeName')}
            error={!!errors.tradeName}
            helperText={errors.tradeName ? errors.tradeName?.message?.toString() : ''}
          />
          <TextField
            label="CNPJ"
            {...register('cnpj')}
            error={!!errors.cnpj}
            helperText={errors.cnpj ? errors.cnpj?.message?.toString() : ''}
          />
          <TextField
            label="Endereço"
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address ? errors.address?.message?.toString() : ''}
          />
          <TextField
            label="Contato do financeiro do parceiro"
            {...register('partnerFinancialContact')}
            error={!!errors.partnerFinancialContact}
            helperText={
              errors.partnerFinancialContact
                ? errors.partnerFinancialContact?.message?.toString()
                : ''
            }
          />
          <TextField
            label="Website"
            {...register('website')}
            error={!!errors.website}
            helperText={errors.website ? errors.website?.message?.toString() : ''}
          />
          <TextField
            label="Data da assinatura"
            type="date"
            {...register('signingDate')}
            error={!!errors.signingDate}
            helperText={errors.signingDate ? errors.signingDate?.message?.toString() : ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl>
            <InputLabel id="paymentDay-label">Dia de pagamento</InputLabel>
            <Select
              labelId="paymentDay-label"
              {...register('paymentDay')}
              error={!!errors.paymentDay}
            >
              {/* Opções mockadas */}
              {optionsPaymentDay.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Gratuidade Stock"
            {...register('stockGratuity')}
            error={!!errors.stockGratuity}
            helperText={errors.stockGratuity ? errors.stockGratuity?.message?.toString() : ''}
          />
          <TextField
            label="Contatos do parceiro"
            {...register('partnerContacts')}
            error={!!errors.partnerContacts}
            helperText={errors.partnerContacts ? errors.partnerContacts?.message?.toString() : ''}
          />
          <TextField
            label="Gerente de canais stock"
            {...register('stockChannelManager')}
            error={!!errors.stockChannelManager}
            helperText={
              errors.stockChannelManager ? errors.stockChannelManager?.message?.toString() : ''
            }
          />
          <FormControl>
            <InputLabel id="dollarType-label">Tipo de dólar</InputLabel>
            <Select
              labelId="dollarType-label"
              {...register('dollarType')}
              error={!!errors.dollarType}
            >
              {/* Opções mockadas */}
              <MenuItem value="opcao1">Opção 1</MenuItem>
              <MenuItem value="opcao2">Opção 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="tax-label">Imposto</InputLabel>
            <Select labelId="tax-label" {...register('tax')} error={!!errors.tax}>
              {/* Opções mockadas */}
              <MenuItem value="opcao1">Opção 1</MenuItem>
              <MenuItem value="opcao2">Opção 2</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button fullWidth type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </div>
  )
}

export default Index

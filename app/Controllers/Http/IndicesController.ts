import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema } from '@ioc:Adonis/Core/Validator'
import { Client } from '@microsoft/microsoft-graph-client'
import { createObjectCsvWriter } from 'csv-writer'
import stringTable from 'string-table'

const clientId = 'seu_client_id'
const clientSecret = 'seu_client_secret'
const refreshToken = 'seu_refresh_token'

async function getAccessToken(): Promise<string> {
  const client = Client.init({
    authProvider: (done) => {
      done(null, {
        accessToken: refreshToken,
        tokenType: 'Bearer',
      } as any)
    },
  })

  const response = await client.api('/oauth2/v2.0/token').post({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    scope: 'https://graph.microsoft.com/.default',
  })

  return response.access_token
}

async function addDataToCsvTable(fileName: string, newRecord: Record<string, any>): Promise<void> {
  try {
    const csvWriter = createObjectCsvWriter({
      path: fileName,
      header: Object.keys(newRecord).map((key) => ({ id: key, title: key })),
      append: true,
    })

    await csvWriter.writeRecords([newRecord])

    console.log('Dado adicionado com sucesso à tabela CSV.')
  } catch (error) {
    console.log('Ocorreu um erro:', error)
  }
}

export default class IndicesController {
  public async index({ inertia }: HttpContextContract) {
    return inertia.render('Index', {
      title: 'Home',
    })
  }

  public async store({ request, session }: HttpContextContract) {
    const ContractValidator = schema.create({
      mspConsoleName: schema.string({}, [rules.required()]),
      mmc: schema.string({}, [rules.required()]),
      userLogin: schema.string({}, [rules.required()]),
      contractStartDate: schema.date({}, [rules.required()]),
      acronisRampUp: schema.string({}, [rules.required()]),
      stockRampUp: schema.string({}, [rules.required()]),
      acronisGratuity: schema.string({}, [rules.required()]),
      tradeName: schema.string({}, [rules.required()]),
      cnpj: schema.string({}, [rules.required()]),
      address: schema.string({}, [rules.required()]),
      partnerFinancialContact: schema.string({}, [rules.required()]),
      website: schema.string({}, [rules.required()]),
      signingDate: schema.date({}, [rules.required()]),
      paymentDay: schema.string({}, [rules.required()]),
      stockGratuity: schema.string({}, [rules.required()]),
      partnerContacts: schema.string({}, [rules.required()]),
      stockChannelManager: schema.string({}, [rules.required()]),
      dollarType: schema.string({}, [rules.required()]),
      tax: schema.string({}, [rules.required()]),
    })

    const data = await request.validate({
      schema: ContractValidator,
    })
    const mailsToSend = ['manuel@lisbom.com']
    await Promise.all(
      mailsToSend.map((mail) =>
        Mail.sendLater((message) => {
          message
            .from('teste@teste.com')
            .to(mail)
            .subject('Novo contrato cadastrado')
            .text(`Novo contrato cadastrado!\n\n ${stringTable.create(data)}`)
        })
      )
    )
    addDataToCsvTable('contratos.csv', data)
    session.flash('success', { message: ['Contrato cadastrado com sucesso!'] })
  }
}

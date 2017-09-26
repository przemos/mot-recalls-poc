'use strict'

const co = require('co')
const config = require('./app/config')
const errorHandler = require('./app/errorHandler')
const smmtClientFactory = require('./app/smmt')

const handler = errorHandler(co.wrap(function *(event, context, callback) {

    console.time('all')
    const {vin, make} = event.queryStringParameters
    console.time('getParams')
    const [smmtUri, smmtApiKey] = yield config.getValue(config.Param.SMMT_URI, config.Param.SMMT_API_KEY)
    console.timeEnd('getParams')
    console.log(smmtUri, smmtApiKey)
    const smmtClient = smmtClientFactory(smmtUri, smmtApiKey)
    console.time('smmtClient')
    const response = yield smmtClient.getRecalls(vin, make)
    console.timeEnd('smmtClient')
    console.log(response.body)
    callback(null, {statusCode: 200, body : JSON.stringify(response.body)})
    console.timeEnd('all')
}))

module.exports =  {
    handler
}
'use strict'
const AWS = require('aws-sdk')
const Promise  = require('bluebird')
const cbKms = new AWS.KMS()
const decryptSecret = Promise.promisify(cbKms.decrypt, {context : cbKms})
// cache config
let configCache = []

const param = Object.freeze({
    SMMT_API_KEY: { name : 'SMMT_API_KEY', secret: true },
    SMMT_API_URI : {name: 'SMMT_API_URI'},
    LOG_LEVEL: { name: 'LOG_LEVEL'}
})

const getValue = (...params) => {
    return Promise.all(params.map(p => {

        if(configCache[p.name]) {
            return configCache[p.name]
        }
        if(!(p.name in process.env)) {
            throw new Error(`Parameter ${p.name} is not set!`)
        }
        const envVal = process.env[p.name]
        if (p.secret) {
            return decryptSecret({CiphertextBlob: Buffer(envVal, 'base64') })
                .then(data => {   
                    configCache[p.name] = data.Plaintext.toString('ascii')
                    return configCache[p.name]
                })
        } else {
            configCache[p.name] = envVal
            return Promise.resolve(envVal)
        }
    }))
}

module.exports = {
    getValue,
    param
}
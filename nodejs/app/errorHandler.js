'use strict'
const co = require('co')

module.exports = (f) => { 
    return co.wrap(function *(event, context, callback) {
        try {
            yield f(event, context, callback)
        } catch(e) {
            if(e instanceof Error) {
                console.log(e)
                callback(null, {
                    statusCode: 500,
                    body: ''
                })
            }
        }
    })
}
let mock = require('mock-require')

mock('aws-sdk', { KMS : function () {
    return {
        decrypt: function() {
            return 'AAA'
        }
    }
}})

let config = require('../../app/config')

describe('Config', () => {

    it('config gets value', (done) => {
        
        process.env.SMMT_API_URI = 'https://wp.pl'
        config.getValue(config.Param.SMMT_URI).then(val => {
            console.log('VAL', val)
            done()
        })
      
    })
})